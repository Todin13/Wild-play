const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({path: path.resolve(__dirname,"../../.env") }); // environment variables

console.log("MONGO_USER:", process.env.MONGO_USER);
console.log("MONGO_PASSWORD:", process.env.MONGO_PASSWORD);
console.log("MONGO_CLUSTER:", process.env.MONGO_CLUSTER);
console.log("MONGO_DB_NAME:", process.env.MONGO_DB_NAME);

const bookingRoutes = require("./routes/bookingRoutes");

const app = express();
app.use(express.json()); // middleware to parse JSON

// mdb connection
const mongoURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB_NAME}`;

// connect to mdb
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("mongo connected successfully"))
.catch(err => console.error("mongo connection error:", err));

app.use("/api/bookings", bookingRoutes); // booking routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

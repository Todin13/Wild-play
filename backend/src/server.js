const express = require("express");
require('dotenv').config({ path: '../.env' });
const { connectDB } = require("./config/db.js");

connectDB();

const userRoutes = require("./routes/user_routes.js");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();
app.use(express.json()); // middleware to parse JSON

app.use("/api/users", userRoutes);
app.use("/api/bookings", bookingRoutes); // booking routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

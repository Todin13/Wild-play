const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const userRoutes = require("./routes/user_routes.js");

dotenv.config();
connectDB;

require('dotenv').config({ path: '../.env' });

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

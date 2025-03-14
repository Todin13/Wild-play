const express = require("express");
const { connectDB } = require("./config/db.js");
require('dotenv').config({ path: '../.env' });
const cors = require("cors");

// Import Routes
const tripRoutes = require("./routes/tripRoutes");
const userRoutes = require("./routes/user_routes.js");


connectDB();

const app = express();
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/trips", tripRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

<<<<<<< HEAD
const express = require('express');
const { connectDB } = require("./config/db.js");
require('dotenv').config("../.env");
const cors = require('cors');

// Load environment variables

// Import Routes
const userRoutes = require("./routes/user_routes.js");
const searchRoutes = require('./routes/search');
const campersRoutes = require('./routes/campers');
const dealsRoutes = require('./routes/deals');
=======
const express = require("express");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/db.js");
const userRoutes = require("./routes/user_routes.js");
const searchRoutes = require('./routes/search');
const campersRoutes = require('./routes/campers');
const dealsRoutes = require('./routes/deals');

require('dotenv').config("../.env");

>>>>>>> 954bde401e4cb230fe38a8e2c88d8bec0d2130bd

// Connect to MongoDB
connectDB();

const app = express();
<<<<<<< HEAD

// Middleware
app.use(cors()); // Enable CORS for API calls
app.use(express.json()); // Parse JSON request bodies

=======
app.use(express.json());
app.use(cors()); // Enable CORS for API calls
app.use(cookieParser());

>>>>>>> 954bde401e4cb230fe38a8e2c88d8bec0d2130bd
// Routes
app.use("/api/users", userRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/campers', campersRoutes);
app.use('/api/deals', dealsRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
<<<<<<< HEAD
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
=======
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
>>>>>>> 954bde401e4cb230fe38a8e2c88d8bec0d2130bd

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

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors()); // Enable CORS for API calls
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use("/api/users", userRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/campers', campersRoutes);
app.use('/api/deals', dealsRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Load environment variables
const { connectDB } = require('./config/db'); // Import database connection
const searchRoutes = require('./routes/search');
const campersRoutes = require('./routes/campers');



const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Enable CORS for API calls
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use('/api/search', searchRoutes);
app.use('/api/campers', campersRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

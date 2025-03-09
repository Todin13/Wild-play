const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config("../../../.env"); // Load environment variables

// Import Routes
const searchRoutes = require('./routes/search');

const app = express();

// Middleware
app.use(cors()); // Enable CORS for API calls
app.use(express.json()); // Parse JSON request bodies


// Construct MongoDB URI from .env variables
const mongoURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;

// MongoDB Connection
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes
app.use('/api/search', searchRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

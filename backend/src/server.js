const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/db.js");
const userRoutes = require("./routes/user_routes.js");
const searchRoutes = require('./routes/search');
const campersRoutes = require('./routes/campers');

// Connect to MongoDB
connectDB();

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for API calls
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/campers', campersRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

/*

Main file to run the API

*/
const express = require("express");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/db.js");

require('dotenv').config("../.env"); 

// Import Routes
const searchRoutes = require('./routes/searchRoutes.js');
const campersRoutes = require('./routes/campersRoutes.js');
const dealsRoutes = require('./routes/dealsRoutes.js');
const bookingRoutes = require("./routes/bookingRoutes");
const tripRoutes = require("./routes/tripRoutes");
const guideRoutes = require("./routes/guideRoutes");
const helpRoute = require("./routes/helpRoute");
const userRoutes = require("./routes/userRoutes.js");
const reviewsRoutes = require("./routes/reviewsRoutes.js");

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cors()); // Enable CORS for API calls
app.use(cookieParser());

// Routes
app.use("/help", helpRoute);
app.use("/api/users", userRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/campers', campersRoutes);
app.use('/api/deals', dealsRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/guides", guideRoutes);
app.use("/api/reviews", reviewsRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

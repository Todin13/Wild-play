/*

Main file to run the API

*/
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/db.js");

require("dotenv").config("../.env");

// Import Routes
const searchRoutes = require("./routes/searchRoutes.js");
const campersRoutes = require("./routes/campersRoutes.js");
const dealsRoutes = require("./routes/dealsRoutes.js");
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
const allowedOrigins = [
  "http://localhost:5173",
  "https://wild-play.vercel.app",
  "https://wild-play-todin13s-projects.vercel.app",
  "https://wild-play-git-userpage-todin13s-projects.vercel.app",
  "https://wild-play-git-searchpage-todin13s-projects.vercel.app",
];

// Set up CORS middleware to allow only whitelisted origins and enable cookies
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Allow access
      } else {
        callback(new Error("Not allowed by CORS")); // Reject access
      }
    },
    credentials: true, // Allow cookies and session credentials
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/help", helpRoute);
app.use("/api/users", userRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/campers", campersRoutes);
app.use("/api/deals", dealsRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/guides", guideRoutes);
app.use("/api/reviews", reviewsRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Main file to run the API
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/db.js");
require("dotenv").config({ path: "../.env" });

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
const allowedOrigins = [
  "http://localhost:5173",
  "https://wild-play.vercel.app",
  "https://wild-play-api-git-bookingfrontend-todin13s-projects.vercel.app",
  "https://wild-play-git-searchpage-todin13s-projects.vercel.app",
];

// Global error handler (ensures CORS headers even on error)
app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err.message);

  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );

  res.status(err.status || 500).json({
    message: err.message || "Something went wrong",
  });
});

// CORS Configuration
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Preflight handling
app.options(
  "*",
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Built-in middleware
app.use(express.json());
app.use(cookieParser());

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

// Routes
app.use("/help", helpRoute);
app.use("/api/users", userRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/campers", campersRoutes);
app.use("/api/campers?", campersRoutes);
app.use("/api/deals", dealsRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/guides", guideRoutes);
app.use("/api/reviews", reviewsRoutes);

// Fallback route
app.use("/", (req, res) => {
  res.status(200).json({ message: "API is running!" });
});

// Global error handler (ensures CORS headers even on error)
app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err.message);

  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );

  res.status(err.status || 500).json({
    message: err.message || "Something went wrong",
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

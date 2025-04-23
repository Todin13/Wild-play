// Setup
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/db.js");
require("dotenv").config({ path: "../.env" });

const app = express();
connectDB();

const allowedOrigins = [
  "http://localhost:5173",
  "https://wild-play.vercel.app",
  "https://wild-play-todin13s-projects.vercel.app",
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
        callback(null, true);
      }
    },
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/help", require("./routes/helpRoute"));
app.use("/api/users", require("./routes/userRoutes.js"));
app.use("/api/search", require("./routes/searchRoutes.js"));
app.use("/api/campers", require("./routes/campersRoutes.js"));
app.use("/api/deals", require("./routes/dealsRoutes.js"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/trips", require("./routes/tripRoutes"));
app.use("/api/guides", require("./routes/guideRoutes"));
app.use("/api/reviews", require("./routes/reviewsRoutes.js"));

// Fallback route
app.use("/", (req, res) => {
  res.status(200).json({ message: "API is running!" });
});

// ✅ Single error handler at the end
app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err.message);

  // Set CORS headers manually in case of error
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
  console.log(`Server running on port ${PORT}`);
});

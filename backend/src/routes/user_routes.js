const express = require("express");
const { authenticateUser, isAdmin } = require("../middleware/authMiddleware");
const { registerUser, loginUser } = require("../controllers/user_controllers.js");

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes (only authenticated users can access)
router.get("/profile", authenticateUser, (req, res) => {
    res.json({ message: "Welcome to your profile!", user: req.user });
    console.log("Getting /profile for user: ", req.user);
});

// Admin route example
router.get("/admin", authenticateUser, isAdmin, (req, res) => {
    res.json({ message: "Welcome Admin!" });
});

module.exports = router;

const express = require("express");
const { authenticateUser, isAdmin } = require("../middleware/authMiddleware");
const { registerUser, loginUser, searchUser, updateUser, deleteUser, searchUserByAge, profile, logout } = require("../controllers/user_controllers.js");

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/search", searchUser);
router.put("/update/:user", authenticateUser, updateUser);
router.delete("/delete/:id", deleteUser);
router.get("/age", searchUserByAge);
router.post("/logout", logout);

// Protected routes (only authenticated users can access)
router.get("/profile", authenticateUser, profile);

router.get("/cookie", authenticateUser, (req, res) => {
    res.status(200).json({ message: "Protected route accessed!", user: req.user });
});

// Admin route example
router.get("/admin/:_id", authenticateUser, isAdmin, (req, res) => {
    res.json({ message: "Welcome Admin!" });
});

module.exports = router;
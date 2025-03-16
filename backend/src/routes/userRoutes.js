/*

All user routes

*/
const express = require("express");
const { authenticateUser, isAdmin } = require("../middlewares/authMiddlewares.js");
const {  registerUser, loginUser, searchUsers, updateUser, deleteUser, searchUserByUsername, profile, logout } = require("../controllers/userControllers.js");

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/search", authenticateUser, isAdmin, searchUsers);
router.put("/update/:user", authenticateUser, updateUser);
router.get("/username", searchUserByUsername);
router.delete("/delete/:id", deleteUser);
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
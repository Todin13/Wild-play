/*

All user routes

*/
const express = require("express");
const { authenticateUser, isAdmin } = require("../middlewares/authMiddlewares.js");
const {  registerUser, loginUser, searchUsers, updateUser, deleteUser, adminSearchUsers, profile, logout, adminDeleteUser } = require("../controllers/userControllers.js");

const router = express.Router();

// Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/search/admin", authenticateUser, isAdmin, adminSearchUsers);
router.put("/update/", authenticateUser, updateUser);
router.get("/search", searchUsers);
router.delete("/delete/", authenticateUser, deleteUser);
router.delete("/delete/:id", authenticateUser, isAdmin, adminDeleteUser);
router.post("/logout",authenticateUser, logout);

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
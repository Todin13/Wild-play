const express = require("express");
const { authenticateUser, isAdmin } = require("../middleware/authMiddleware");
const { registerUser, loginUser, searchUser, updateUser, deleteUser, searchUserByAge, searchUserByCountry, searchUserByPhone, searchUserByEmail } = require("../controllers/user_controllers.js");

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/search", searchUser);
router.put("/update/:user", authenticateUser, updateUser);
router.delete("/delete/:id", deleteUser);
router.get("/age", searchUserByAge);
router.get("/country", searchUserByCountry);
router.get("/phone", searchUserByPhone);
router.get("/email", searchUserByEmail);


// Protected routes (only authenticated users can access)
router.get("/profile", authenticateUser, (req, res) => {
    res.json({ message: "Welcome to your profile!", user: req.user });
    console.log("Getting /profile for user: ", req.user);
});

// Admin route example
router.get("/admin/:_id", authenticateUser, isAdmin, (req, res) => {
    res.json({ message: "Welcome Admin!" });
});

module.exports = router;
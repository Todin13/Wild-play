const express = require("express");
const router = express.Router();
const { createGuide, getUserGuides, getGuideById, updateGuide, deleteGuide } = require("../controllers/guideControllers");
const { authenticateUser } = require("../middlewares/authMiddlewares");


// Create a new guide
router.post("/", authenticateUser, createGuide);

// Get all guides with optional filtering
router.get("/", getUserGuides);

// Get a single guide by ID
router.get("/:id", authenticateUser, getGuideById);

// Update a guide
router.put("/:id", authenticateUser, updateGuide);

// Delete a guide
router.delete("/:id", authenticateUser, deleteGuide);

module.exports = router;

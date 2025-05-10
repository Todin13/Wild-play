/*

All guides routes
Author: ODIN Thomas

*/
const express = require("express");
const router = express.Router();
const { createGuide, getUserGuides, getGuideById, updateGuide, deleteGuide, createGuideFromTrip, getGuideByUserId } = require("../controllers/guideControllers");
const { authenticateUser } = require("../middlewares/authMiddlewares");


// Create a new guide
router.post("/", authenticateUser, createGuide);

// Create a new guide from trip
router.post("/fromTrip", authenticateUser, createGuideFromTrip);

// Get all guides with optional filtering
router.get("/", getUserGuides);

// Get a single guide by ID
//router.get("/:id", authenticateUser, getGuideById);

// Update a guide
router.put("/:id", authenticateUser, updateGuide);

// Delete a guide
router.delete("/:id", authenticateUser, deleteGuide);

// Get guides for specific user
router.get("/userGuides", authenticateUser, getGuideByUserId);

module.exports = router;

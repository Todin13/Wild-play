/*

Trip planning routes for the api

*/
const express = require("express");
const router = express.Router();
const { createTrip, getUserTrips, getTripById, updateTrip, deleteTrip, createTripFromGuide } = require("../controllers/tripControllers");
const { authenticateUser } = require("../middlewares/authMiddlewares");

// Protected Routes - User must be logged in
router.post("/", authenticateUser, createTrip); // Create a trip
router.get("/", authenticateUser, getUserTrips); // Get all user's trips
router.get("/:id", authenticateUser, getTripById); // Get a single trip
router.put("/:id", authenticateUser, updateTrip); // Update a trip
router.delete("/:id", authenticateUser, deleteTrip); // Delete a trip
router.post("/fromGuide", authenticateUser, createTripFromGuide); // Create a new trip from guide

module.exports = router;

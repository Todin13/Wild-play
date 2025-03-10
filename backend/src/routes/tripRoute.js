/*

Trip planning routes for the api

*/

const express = require("express");
const router = express.Router();
const tripController = require("../controllers/tripController");
const authMiddleware = require("../middlewares/authMiddleware");

// Protected Routes - User must be logged in
router.post("/", authMiddleware, tripController.createTrip); // Create a trip
router.get("/", authMiddleware, tripController.getUserTrips); // Get all user's trips
router.get("/:id", authMiddleware, tripController.getTripById); // Get a single trip
router.put("/:id", authMiddleware, tripController.updateTrip); // Update a trip
router.delete("/:id", authMiddleware, tripController.deleteTrip); // Delete a trip

module.exports = router;

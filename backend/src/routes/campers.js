const express = require('express');
const router = express.Router();
const campersController = require('../controllers/campersController'); // Import the controller
const { authenticateUser, isAdmin } = require('../middlewares/authMiddleware'); // Import middleware


router.get('/', campersController.getAllCampers); // Route to fetch all campers

// Add a new camper (Admin only)
router.post('/', authenticateUser, isAdmin, campersController.addCamper);

// Delete a camper by ID (Admin only)
router.delete('/:id', authenticateUser, isAdmin, campersController.deleteCamper);

module.exports = router;

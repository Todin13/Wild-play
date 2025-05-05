/*

All van routes

*/
const express = require('express');
const router = express.Router();
const campersController = require('../controllers/campersControllers'); // Import the controller
const { authenticateUser, isAdmin } = require('../middlewares/authMiddlewares'); // Import middleware


router.get('/', campersController.getAllCampers); // Route to fetch all campers

router.get('/filters', campersController.getFilterOptions);


// Route to get a specific camper by ID
router.get('/:id', campersController.getCamperById);

// Add a new camper (Admin only)
router.post('/', authenticateUser, isAdmin, campersController.addCamper);

// Delete a camper by ID (Admin only)
router.delete('/:id', authenticateUser, isAdmin, campersController.deleteCamper);

module.exports = router;

/*

All discounts routes
Author: HERVET Thibaut

*/
const express = require('express');
const router = express.Router();
const dealsController = require('../controllers/dealsControllers'); // Import the controller
const { authenticateUser, isAdmin } = require('../middlewares/authMiddlewares'); // Import middleware


router.get('/', dealsController.getAllDeals); // Route to fetch all campers

// Add a new camper (Admin only)
router.post('/', authenticateUser, isAdmin, dealsController.addDeal);

// Delete a camper by ID (Admin only)
router.delete('/:id', authenticateUser, isAdmin, dealsController.deleteDeal);

module.exports = router;

const express = require('express');
const router = express.Router();
const campersController = require('../controllers/campersController'); // Import the controller

router.get('/', campersController.getAllCampers); // Route to fetch all campers

module.exports = router;

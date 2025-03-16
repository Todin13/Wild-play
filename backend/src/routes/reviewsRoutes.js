/*

Reviews routes

*/
const express = require('express');
const router = express.Router();
const reviewsControllers = require('../controllers/reviewsControllers');

// Van Review Routes
router.post('/van', reviewsControllers.createVanReview);
router.get('/van/:van_id', reviewsControllers.getVanReviews);

// Guide Review Routes
router.post('/guide', reviewsControllers.createGuideReview);
router.get('/guide/:guide_id', reviewsControllers.getGuideReviews);

module.exports = router;
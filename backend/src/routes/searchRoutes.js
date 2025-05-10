/*

All search routes
Author: HERVET Thibaut

*/
const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchControllers');

router.get('/', searchController.searchAll);

module.exports = router;

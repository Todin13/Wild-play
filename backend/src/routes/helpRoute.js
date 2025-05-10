/*

Help route
Author: ODIN Thomas

*/
const express = require("express");
const router = express.Router();
const baseController = require("../controllers/helpController");

// Base route that gives information about all available routes
router.get("/", baseController.getRoutesInfo);

module.exports = router;
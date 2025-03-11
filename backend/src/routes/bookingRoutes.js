const express = require("express");
const router = express.Router();
const { getAllBookings, setBooking } = require("../controllers/bookingControllers");
const authMiddleware = require("../middleware/authMiddleware");

// get all bookings for a user
router.get("/:user_id", authMiddleware, getAllBookings);

// route to create a new booking
router.post("/", authMiddleware, setBooking);

module.exports = router;

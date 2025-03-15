const express = require("express");
const router = express.Router();
const { getAllBookings, setBooking, editBooking, changeBookingStatus, deleteBooking } = require("../controllers/bookingControllers");
const authMiddleware = require("../middleware/authMiddleware");

// get all bookings for a user
router.get("/:user_id", authMiddleware, getAllBookings);

// route to create a new booking
router.post("/", authMiddleware, setBooking);

// route to edit an existing booking
router.put("/:booking_id", authMiddleware, editBooking);

// route to change the status of a booking
router.patch("/:booking_id/status", authMiddleware, changeBookingStatus);

// route to delete a booking
router.delete("/:booking_id", authMiddleware, deleteBooking);

module.exports = router;
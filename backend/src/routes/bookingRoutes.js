/*

All booking routes

*/
const express = require("express");
const router = express.Router();
const controllers = require("../controllers/bookingControllers");
const { authenticateUser } = require("../middlewares/authMiddlewares");


// get all bookings for a user
router.get("/all", authenticateUser, controllers.getAllBookings);

// get specific booking by ID
router.get("/:booking_id", authenticateUser, controllers.getBookingById);

// route to create a new booking
router.post("/", authenticateUser, controllers.setBooking);

// route to edit an existing booking
router.put("/:booking_id", authenticateUser, controllers.editBooking);

// route to change the status of a booking
router.patch("/:booking_id/status", authenticateUser, controllers.changeBookingStatus);

// route to delete a booking
router.delete("/:booking_id", authenticateUser, controllers.deleteBooking);

router.patch("/:booking_id/cancel", authenticateUser, controllers.cancelBooking);

module.exports = router;
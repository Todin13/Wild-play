const express = require("express");
const router = express.Router();
const controllers = require("../controllers/bookingControllers");
console.log("Imported Controllers:", controllers);
const { authenticateUser } = require("../middleware/authMiddleware");


// get all bookings for a user
router.get("/:user_id", authenticateUser, controllers.getAllBookings);

// route to create a new booking
router.post("/", authenticateUser, controllers.setBooking);

// route to edit an existing booking
router.put("/:booking_id", authenticateUser, controllers.editBooking);

// route to change the status of a booking
router.patch("/:booking_id/status", authenticateUser, controllers.changeBookingStatus);

// route to delete a booking
router.delete("/:booking_id", authenticateUser, controllers.deleteBooking);

module.exports = router;
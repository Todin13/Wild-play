/*

All methods for the booking

*/
const { Booking, Van } = require("../models/index");

// get all bookings for a given user id
const getAllBookings = async (req, res) => {
    // admin can view all bookings, users view only their own bookings  
    try {
        const {id, user_type} = req.user;
        if (!id) {
            return res.status(400).json({ message: "User id required;" });
        }
        if (user_type === 'ADMIN') {
            const bookings = await Booking.find().populate("van_id");
            res.status(200).json(bookings);
        } else {
            if (!id) {
                return res.status(400).json({ message: "User id required;" });  // if user_id not provided return 400
            }
            const bookings = await Booking.find({"user_id": id}).populate("van_id");  // fetch bookings for the user
            res.status(200).json(bookings);
        }
    } catch (error) {
        res.status(500).json({ message: "Error occured, try again later;", error });    // if error return 500
    }
};

// get specific booking by its ID
const getBookingById = async (req, res) => {
    try {
        const { booking_id } = req.params;
        const booking = await Booking.findById(booking_id).populate("van_id"); // populate van details

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" }); // if booking not found return 404
        }
        res.status(200).json(booking); // if booking found return 200
    } catch (error) {
        res.status(500).json({ message: "Error retrieving booking", error }); // if error return 500
    }
};

// create new booking
const setBooking = async (req, res) => { // validate and save new booking data in database
    try {
        // console.log("recieved data:", req.body);
        // console.log("user id:", req.user?.id);
        const {
            van_id,
            start_date,
            end_date,
            pick_up_location,
            return_location,
            status,
            amount,
            delivery_location,
            paid,
            promocode
        } = req.body;

        if (!van_id || !start_date || !end_date || !return_location || amount === undefined) {
            return res.status(400).json({ message: "Required data is missing;" });  // if required data is missing return 400
        }
    
        const { id } = req.user;

        const newBooking = new Booking({
            "user_id": id,
            van_id,
            start_date,
            end_date,
            pick_up_location,
            return_location,
            status,
            amount,
            delivery_location,
            paid,
            promocode
        });

        const savedBooking = await newBooking.save();   // save new booking
        await Van.findByIdAndUpdate(van_id, { isAvailable: false });
        res.status(201).json(savedBooking);     // if booking saved return 201
    } catch (error) {
        res.status(500).json({ message: "Error saving booking", error });   // if error return 500
    }
};

// update booking
const editBooking = async (req, res) => {
    try {
      const bookingId = req.params.booking_id;
      const updatedBookingData = req.body;
  
      // Fetch the booking from the database
      const booking = await Booking.findById(bookingId);
  
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
  
      // Check if the user is authorized to edit the booking
      const isUserAuthorized = req.user.id.toString() === booking.user_id.toString();
    //   console.log("User authorized:", isUserAuthorized);
    //   console.log("User req id:", req.user.id.toString());
    //   console.log("Booking user id:", booking.user_id.toString());
  
      if (!isUserAuthorized) {
        return res.status(403).json({ message: "You are not authorized to edit this booking" });
      }
  
      // Update the booking in the database
      const updatedBooking = await Booking.findByIdAndUpdate(bookingId, updatedBookingData, { new: true });
  
      if (!updatedBooking) {
        return res.status(404).json({ message: "Booking not found" });
      }
  
      res.status(200).json(updatedBooking);
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating booking" });
    }
  };

// change booking status
const changeBookingStatus = async (req, res) => {
    try {
        const { booking_id } = req.params;
        const { new_status } = req.body;
        const { id, user_type } = req.user;

        const booking = await Booking.findById(booking_id); // find booking by id

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });  // if booking not found return 404
        }

        const validStatuses = ['PENDING', 'CONFIRMED', 'CANCELLED'];

        if (!validStatuses.includes(new_status)) {
            return res.status(400).json({ message: "Invalid booking status" }); // if invalid status return 400
        }

        if (user_type === 'ADMIN' || booking.user_id.toString() === id.toString()) {
            booking.status = new_status;
        } else {
            return res.status(403).json({ message: "You are not authorized to change this booking status" });
        }

        const updatedBooking = await booking.save(); // save updated booking
        res.status(200).json(updatedBooking); // if booking status updated return 200
    } catch (error) {
        res.status(500).json({ message: "Error occured while changing booking status", error }); // if error return 500
    }
};

// delete booking
const deleteBooking = async (req, res) => {
    try {
        const { booking_id } = req.params;
        const { id, user_type } = req.user; // change user_id to id

        const booking = await Booking.findById(booking_id);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Fix the user authorization check
        const isUserAuthorized = user_type === 'ADMIN' || booking.user_id.toString() === id.toString();
        console.log("Is auth:", isUserAuthorized, "booking.user_id:", booking.user_id.toString(), "user_id:", id);

        if (!isUserAuthorized) {
            return res.status(403).json({ message: "You are not authorized to delete this booking" });
        }

        //await booking.remove();
        await booking.deleteOne();

        res.status(200).json({ message: "Booking deleted successfully" });
    } catch (error) {        
        res.status(500).json({ message: "Error occurred while deleting a booking", error });
    }
};

const cancelBooking = async (req, res) => {
    const { booking_id } = req.params;
  
    try {    
      const booking = await Booking.findById(booking_id).populate("van_id");  
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
  
      if (booking.status === "CANCELLED") {
        return res.status(400).json({ message: "Booking is already cancelled" });
      }
  
      booking.status = "CANCELLED";
      await booking.save();
  
      const van = booking.van_id;
      if (van) {
        van.isAvailable = true;
        await van.save();
      }
  
      res.status(200).json(booking);
    } catch (err) {
      console.error("Error cancelling booking:", err);
      res.status(500).json({ message: "Server error while cancelling booking" });
    }
  };

module.exports = { // export booking controllers
    cancelBooking,
    getAllBookings,
    getBookingById,
    setBooking,
    editBooking,
    changeBookingStatus,
    deleteBooking
};

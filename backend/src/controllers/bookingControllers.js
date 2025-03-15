const { Booking } = require("../models/index");

// get all bookings for a given user id
const getAllBookings = async (req, res) => {
    // admin can view all bookings, users view only their own bookings  
    try {
        const {user_id} = req.params;
        const {user_type} = req.user;
        if (!user_id) {
            return res.status(400).json({ message: "User id required;" });
        }
        if (user_type === 'ADMIN') {
            const bookings = await Booking.find().populate("van_id");
            res.status(200).json(bookings);
        } else {
            if (!user_id) {
                return res.status(400).json({ message: "User id required;" });  // if user_id not provided return 400
            }
            const bookings = await Booking.find({user_id}).populate("van_id");  // fetch bookings for the user
            res.status(200).json(bookings);
        }
    } catch (error) {
        res.status(500).json({ message: "Error occured, try again later;", error });    // if error return 500
    }
};

// create new booking
const setBooking = async (req, res) => { // validate and save new booking data in database
    try {
        const {
            user_id,
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

        if (!user_id || !van_id || !start_date || !end_date || !return_location || amount === undefined) {
            return res.status(400).json({ message: "Required data is missing;" });  // if required data is missing return 400
        }

        const newBooking = new Booking({
            user_id,
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
        res.status(201).json(savedBooking);     // if booking saved return 201
    } catch (error) {
        res.status(500).json({ message: "Error saving booking", error });   // if error return 500
    }
};

// update booking
const editBooking = async (req, res) => {
    try {
        const { booking_id } = req.params;
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
        const { user_id, user_type } = req.user;

        const booking = await Booking.findById(booking_id);     // find booking by id

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" }); // if booking not found return 404
        }

        if (user_type === 'ADMIN' || booking.user_id.toString() === user_id) {
            booking.van_id = van_id || booking.van_id;
            booking.start_date = start_date || booking.start_date;
            booking.end_date = end_date || booking.end_date;
            booking.pick_up_location = pick_up_location || booking.pick_up_location;
            booking.return_location = return_location || booking.return_location;
            booking.status = status || booking.status;
            booking.amount = amount || booking.amount;
            booking.delivery_location = delivery_location || booking.delivery_location;
            booking.paid = paid || booking.paid;
            booking.promocode = promocode || booking.promocode;
        } else {
            return res.status(403).json({ message: "You are not authorized to edit this booking" }); // if not admin and not owner, return 403
        }

        const updatedBooking = await booking.save();    // save updated booking
        res.status(200).json(updatedBooking);   // if booking updated return 200
    } catch (error) {
        res.status(500).json({ message: "Error occured while editing a booking", error });  // if error return 500
    }
};

// change booking status
const changeBookingStatus = async (req, res) => {
    try {
        const { booking_id } = req.params;
        const { new_status } = req.body;
        const { user_id, user_type } = req.user;

        const booking = await Booking.findById(booking_id); // find booking by id

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });  // if booking not found return 404
        }

        const validStatuses = ['PENDING', 'CONFIRMED', 'CANCELLED'];

        if (!validStatuses.includes(new_status)) {
            return res.status(400).json({ message: "Invalid booking status" }); // if invalid status return 400
        }

        if (user_type === 'ADMIN' || booking.user_id.toString() === user_id) {
            booking.status = new_status; // update booking status
        } else {
            return res.status(403).json({ message: "You are not authorized to change this booking status" }); // if not admin and not owner, return 403
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
        const { user_id, user_type } = req.user;

        const booking = await Booking.findById(booking_id); // find booking by id

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" }); // if booking not found return 404
        }

        if (user_type === 'ADMIN' || booking.user_id.toString() === user_id) {
            await booking.remove(); // delete booking
            res.status(200).json({ message: "Booking deleted successfully" }); // if booking deleted return 200
        } else {
            return res.status(403).json({ message: "You are not authorized to delete this booking" }); // if not admin and not owner return 403
        }
    } catch (error) {
        res.status(500).json({ message: "Error occured while deleting a booking", error }); // if error return 500
    }
};

module.exports = { // export booking controllers
    getAllBookings,
    setBooking,
    editBooking,
    changeBookingStatus,
    deleteBooking
};

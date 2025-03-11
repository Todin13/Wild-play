const Booking = require("../models/index");

// get all bookings for a given user id
const getAllBookings = async (req, res) => {




    try {
        const {user_id} = req.params;
        const {user_type} = req.user;
        if (!user_id) {
            return res.status(400).json({ message: "User id is required;" });
        }
        const bookings = await Booking.find({user_id}).populate("van_id");
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving bookings, try again later;", error });
    }
};

// create new booking
const setBooking = async (req, res) => {
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
            return res.status(400).json({ message: "Required data is missing;" });
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

        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);
    } catch (error) {
        res.status(500).json({ message: "Error saving booking", error });
    }
};

module.exports = {
    getAllBookings,
    setBooking
};

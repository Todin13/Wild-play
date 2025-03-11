const jwt = require("jsonwebtoken");

// middleware to validate booking details before saving
const validateBookingData = (req, res, next) => {
    const { user_id, van_id, start_date, end_date, return_location, amount } = req.body;

    if (!user_id || !van_id || !start_date || !end_date || !return_location || amount === undefined) {
        return res.status(400).json({ message: "Missing required booking fields" });
    }

    next(); // proceeds if validation passes
};

module.exports = {
    verifyUser,
    validateBookingData
};

/*

All methods for the reviews

*/
const { VanReview, GuideReview } = require('../models');

// Create a new van review
exports.createVanReview = async (req, res) => {
    try {
        const {id} = req.user;
        const { van_id, rating, review } = req.body;
        
        if ( !van_id || !rating || !review) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newReview = new VanReview({ "user_id": id, van_id, rating, review, date: new Date() });
        await newReview.save();

        res.status(201).json({ message: "Van review added successfully", review: newReview });
    } catch (error) {
        res.status(500).json({ message: "Error creating van review", error: error.message });
    }
};

// Get all reviews for a specific van with optional filters
exports.getVanReviews = async (req, res) => {
    try {
        const { van_id } = req.params;
        const { user_id, rating } = req.query;
        
        let filter = { van_id };
        if (user_id) filter.user_id = user_id;
        if (rating) filter.rating = rating;

        const reviews = await VanReview.find(filter).populate('user_id', 'username');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Error fetching van reviews", error: error.message });
    }
};

// Create a new guide review
exports.createGuideReview = async (req, res) => {
    try {
        const user_id = req.user.id;
        const { guide_id, rating, review } = req.body;
        
        if (!user_id || !guide_id || !rating || !review) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newReview = new GuideReview({ user_id, guide_id, rating, review, date: new Date() });
        await newReview.save();

        res.status(201).json({ message: "Guide review added successfully", review: newReview });
    } catch (error) {
        res.status(500).json({ message: "Error creating guide review", error: error.message });
    }
};

// Get all reviews for a specific guide with optional filters
exports.getGuideReviews = async (req, res) => {
    try {
        const { guide_id } = req.params;
        const { user_id, rating } = req.query;
        
        let filter = { guide_id };
        if (user_id) filter.user_id = user_id;
        if (rating) filter.rating = rating;

        const reviews = await GuideReview.find(filter).populate('user_id', 'username');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Error fetching guide reviews", error: error.message });
    }
};

const { Van, VanReview, GuideReview, Discount, Guide, Trip } = require('../models');

exports.searchAll = async (req, res) => {
    try {
        const { keyword } = req.query;

        if (!keyword) {
            return res.status(400).json({ error: "Missing search keyword" });
        }

        console.log("🔎 Searching for:", keyword);

        // Split the sentence into individual words
        const searchKeywords = keyword.split(/\s+/);

        // Build the search conditions dynamically for each model
        const createSearchQuery = (field, keywords) => {
            return keywords.map(keyword => ({
                [field]: { $regex: keyword, $options: "i" }
            }));
        };

        // Build the search query for Van model
        const vanQueries = [
            ...createSearchQuery('manufacturer', searchKeywords),
            ...createSearchQuery('model', searchKeywords),
            ...createSearchQuery('color', searchKeywords),
            ...createSearchQuery('location', searchKeywords),
            ...createSearchQuery('info', searchKeywords)
        ];

        // Search Vans based on the built queries
        const vans = await Van.find({ $or: vanQueries }).lean();

        // Search in relevant fields for VanReviews, GuideReviews, Guides, Trips
        const vanReviews = await VanReview.find({ review: { $in: searchKeywords } }).lean();
        const guideReviews = await GuideReview.find({ review: { $in: searchKeywords } }).lean();
        const discounts = await Discount.find().lean(); // No text fields to search in Discount model
        const guideQueries = [
            ...createSearchQuery('locations', searchKeywords),
            ...createSearchQuery('notes', searchKeywords)
        ];
        const guides = await Guide.find({ $or: guideQueries }).lean();
        const tripQueries = [
            ...createSearchQuery('locations', searchKeywords),
            ...createSearchQuery('notes', searchKeywords)
        ];
        const trips = await Trip.find({ $or: tripQueries }).lean()

        console.log("🚐 Vans Found:", vans.length);
        console.log("💬 Van Reviews Found:", vanReviews.length);
        console.log("🌍 Guide Reviews Found:", guideReviews.length);
        console.log("💰 Discounts Found:", discounts.length);
        console.log("📚 Guides Found:", guides.length);
        console.log("🗺️ Trips Found:", trips.length);

        res.json({
            vans,
            vanReviews,
            guideReviews,
            discounts,
            guides,
            trips,
            totalResults: vans.length + vanReviews.length + guideReviews.length + discounts.length + guides.length + trips.length
        });
    } catch (error) {
        console.error("❌ Error in search:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

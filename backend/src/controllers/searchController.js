const { Van, VanReview, GuideReview, Discount, Guide, Trip } = require('../models');

exports.searchAll = async (req, res) => {
    try {
        const { keyword } = req.query;

        if (!keyword) {
            return res.status(400).json({ error: "Missing search keyword" });
        }

        console.log("🔎 Searching for:", keyword);

        const searchQuery = { $regex: keyword, $options: "i" }; // Case-insensitive search

        // Search in relevant text fields
        const vans = await Van.find({
            $or: [
                { manufacturer: searchQuery },
                { model: searchQuery },
                { color: searchQuery },
                { location: searchQuery },
                { info: searchQuery }
            ]
        }).lean();
    

        const vanReviews = await VanReview.find({ review: searchQuery }).lean();
        const guideReviews = await GuideReview.find({ review: searchQuery }).lean();
        const discounts = await Discount.find().lean(); // Discounts don't have text fields to search
        const guides = await Guide.find({
            $or: [{ locations: searchQuery }, { notes: searchQuery }]
        }).lean();

        const trips = await Trip.find({
            $or: [{ locations: searchQuery }, { notes: searchQuery }]
        }).lean();

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

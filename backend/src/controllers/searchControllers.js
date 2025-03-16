/*

All methods for the search

*/
const { Van, VanReview, GuideReview, Discount, Guide, Trip } = require('../models');

exports.searchAll = async (req, res) => {
    try {
        const { keyword } = req.query;

        if (!keyword || typeof keyword !== "string") {
            return res.status(400).json({ error: "Missing or invalid search keyword" });
        }

        console.log("🔎 Searching for:", keyword);

        // Regex search with case-insensitive option "i"
        const searchRegex = new RegExp(keyword, "i");

        // Search Vans
        const vans = await Van.find({
            $or: [
                { manufacturer: searchRegex },
                { model: searchRegex },
                { color: searchRegex },
                { location: searchRegex },
                { info: searchRegex }
            ]
        }).lean();

        // Search Reviews
        const vanReviews = await VanReview.find({ review: searchRegex }).lean();
        const guideReviews = await GuideReview.find({ review: searchRegex }).lean();

        // Search Guides & Trips
        const guides = await Guide.find({
            $or: [
                { locations: { $elemMatch: { name: searchRegex } } },
                { notes: searchRegex }
            ]
        }).lean();

        const trips = await Trip.find({
            $or: [
                { locations: { $elemMatch: { name: searchRegex } } },
                { notes: searchRegex }
            ]
        }).lean();

        // No search needed for discounts, just return all
        const discounts = await Discount.find().lean();

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


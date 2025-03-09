const { Van } = require('../models');

exports.getAllCampers = async (req, res) => {
    try {
        const campers = await Van.find().lean(); // Fetch all vans
        res.json({ campers, count: campers.length });
    } catch (error) {
        console.error("❌ Error fetching campers:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

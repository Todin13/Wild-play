const { Deal } = require('../models');

exports.getAllDeals = async (req, res) => {
    try {

        const deals = await Deal.find().lean(); // Fetch all vans
        res.json({ deals, count: deals.length });
    } catch (error) {
        console.error("❌ Error fetching deals:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.addDeal = async (req, res) => {
    try {
        if (req.user.user_type !== 'ADMIN') {
            return res.status(403).json({ error: "Unauthorized: Admins only" });
        }

        const newDeal = new Deal({
            van_id: req.body.van_id,
            discount: req.body.discount,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
        });

        await newDeal.save();
        res.status(201).json({ message: "✅ Deal added successfully", deal: newDeal });
    } catch (error) {
        console.error("❌ Error adding deal:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.deleteDeal = async (req, res) => {
    try {
        if (req.user.user_type !== 'ADMIN') {
            return res.status(403).json({ error: "Unauthorized: Admins only" });
        }

        const deletedDeal = await Deal.findByIdAndDelete(req.params.id);
        if (!deletedVan) {
            return res.status(404).json({ error: "Deal not found" });
        }

        res.json({ message: "✅ Deal deleted successfully", deletedDeal: deletedDeal });
    } catch (error) {
        console.error("❌ Error deleting deal:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

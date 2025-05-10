/*

All methods for the discounts (deal pages)
Author: Thibaut Hervet

*/
const { Deal } = require('../models');
 
exports.getAllDeals = async (req, res) => { // Récupérer tous les deals
    try {
        
        let filters = {}; // Initialiser les filtres

        if (req.query.van_id) {
            // If the van_id is a valid ObjectId
            if (mongoose.Types.ObjectId.isValid(req.query.van_id)) {
                filters.van_id = mongoose.Types.ObjectId(req.query.van_id);  // Conversion in ObjectId
            } else {
                // if the van_id is not a valid ObjectId
                filters.van_id = req.query.van_id;  // Use the string directly
            }
        }

        if (req.query.discount) {  // Filter by discount
            filters.discount = req.query.discount;
        }

        if (req.query.minDiscount) { // Filter by minimum discount
            filters.discount = { ...filters.discount, $gte: req.query.minDiscount };
        }

        if (req.query.maxDiscount) { // Filter by maximum discount
            filters.discount = { ...filters.discount, $lte: req.query.maxDiscount };
        }

       // Date range filter: start_date and end_date
        if (req.query.start_date || req.query.end_date) {
            let dateFilter = {};

            if (req.query.start_date) { 
                dateFilter.$gte = new Date(req.query.start_date);
            }
            if (req.query.end_date) {
                dateFilter.$lte = new Date(req.query.end_date);
            }

            filters.start_date = dateFilter;
        }

        // Request to the database with the filters  
        const deals = await Deal.find(filters).lean();  // use lean() to get plain JS objects instead of Mongoose documents
        res.json({ deals, count: deals.length });
    } catch (error) {
        console.error("❌ Error fetching deals:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.addDeal = async (req, res) => { //Add a deal
    try {
        if (req.user.user_type !== 'ADMIN') {
            return res.status(403).json({ error: "Unauthorized: Admins only" });
        }

        const newDeal = new Deal({
            van_id: req.body.van_id,
            discount: req.body.discount,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            promocode: req.body.promocode,
        });

        await newDeal.save();
        res.status(201).json({ message: "✅ Deal added successfully", deal: newDeal });  
    } catch (error) {
        console.error("❌ Error adding deal:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.deleteDeal = async (req, res) => { // Delete a deal
    try {
        if (req.user.user_type !== 'ADMIN') { // Only admins can delete deals
            return res.status(403).json({ error: "Unauthorized: Admins only" });
        }

        const deletedDeal = await Deal.findByIdAndDelete(req.params.id);
        if (!deletedDeal) {
            return res.status(404).json({ error: "Deal not found" });
        }

        res.json({ message: "✅ Deal deleted successfully", deletedDeal: deletedDeal }); 
    } catch (error) {
        console.error("❌ Error deleting deal:", error);
        res.status(500).json({ error: "Internal Server Error", debugging: error.message });
    }
};

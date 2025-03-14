const { Deal } = require('../models');

exports.getAllDeals = async (req, res) => {
    try {
        let filters = {};

        if (req.query.van_id) {
            // Si l'ID est un ObjectId valide, le convertir
            if (mongoose.Types.ObjectId.isValid(req.query.van_id)) {
                filters.van_id = mongoose.Types.ObjectId(req.query.van_id);  // Conversion en ObjectId
            } else {
                // Si ce n'est pas un ObjectId, traiter le comme une chaîne de caractères (par exemple UUID)
                filters.van_id = req.query.van_id;  // Utiliser directement comme chaîne de caractères
            }
        }

        if (req.query.discount) {
            filters.discount = req.query.discount;
        }

        if (req.query.minDiscount) {
            filters.discount = { ...filters.discount, $gte: req.query.minDiscount };
        }

        if (req.query.maxDiscount) {
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

        // Requête pour récupérer les deals, en incluant le filtre par type de van
        const deals = await Deal.find(filters).lean();  // Utiliser les filtres construits
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

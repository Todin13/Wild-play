const { Van } = require('../models');

exports.getAllCampers = async (req, res) => {
    try {
        let filters = {};

        // Apply filters if query parameters exist
        if (req.query.manufacturer) {
            filters.manufacturer = req.query.manufacturer;
        }
        if (req.query.transmission) {
            filters.transmission = req.query.transmission;
        }
        if (req.query.type) {
            filters.type = req.query.type;
        }

        // Filter by price range
        if (req.query.minPrice || req.query.maxPrice) {
            filters.price = {};
            if (req.query.minPrice) filters.price.$gte = parseInt(req.query.minPrice);
            if (req.query.maxPrice) filters.price.$lte = parseInt(req.query.maxPrice);
        }

        // Filter by number of beds
        if (req.query.beds) {
            filters.beds = parseInt(req.query.beds);
        }


        const campers = await Van.find().lean(); // Fetch all vans
        res.json({ campers, count: campers.length });
    } catch (error) {
        console.error("❌ Error fetching campers:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.addCamper = async (req, res) => {
    try {
        if (req.user.user_type !== 'ADMIN') {
            return res.status(403).json({ error: "Unauthorized: Admins only" });
        }

        const newVan = new Van({
            manufacturer: req.body.manufacturer,
            model: req.body.model,
            price: req.body.price,
            seats: req.body.seats,
            beds: req.body.beds,
            transmission: req.body.transmission,
            location: req.body.location,
            color: req.body.color,
            isAvailable: req.body.isAvailable || true
        });

        await newVan.save();
        res.status(201).json({ message: "✅ Camper added successfully", camper: newVan });
    } catch (error) {
        console.error("❌ Error adding camper:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.deleteCamper = async (req, res) => {
    try {
        if (req.user.user_type !== 'ADMIN') {
            return res.status(403).json({ error: "Unauthorized: Admins only" });
        }

        const deletedVan = await Van.findByIdAndDelete(req.params.id);
        if (!deletedVan) {
            return res.status(404).json({ error: "Camper not found" });
        }

        res.json({ message: "✅ Camper deleted successfully", deletedCamper: deletedVan });
    } catch (error) {
        console.error("❌ Error deleting camper:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

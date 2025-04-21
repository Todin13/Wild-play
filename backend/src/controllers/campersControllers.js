/*

All methods for the van access an view

*/
const { Van } = require('../models');

exports.getAllCampers = async (req, res) => { //get all campers
    try {
        let filters = {}; // Initialize filters object

        // Apply filters if query parameters exist
        if (req.query.manufacturer) { // Filter by manufacturer
            filters.manufacturer = req.query.manufacturer;
        }
        if (req.query.transmission) { // Filter by transmission type
            filters.transmission = req.query.transmission;
        }
        if (req.query.type) { // Filter by type
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
        res.json({ campers, count: campers.length }); //show the number of campers
    } catch (error) {
        console.error("❌ Error fetching campers:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get a single camper by ID
exports.getCamperById = async (req, res) => {
    try {
        const camperId = req.params.id; // Get camper ID from URL parameters
        const camper = await Van.findById(camperId).lean(); // Find camper by ID

        if (!camper) {
            return res.status(404).json({ error: "Camper not found" }); // If camper not found
        }

        res.json({ camper }); // Return the camper details
    } catch (error) {
        console.error("❌ Error fetching camper:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.addCamper = async (req, res) => {
    try {
        if (req.user.user_type !== 'ADMIN') {
            return res.status(403).json({ error: "Unauthorized: Admins only" }); //only admins can add campers
        }

        // Required fields
        const requiredFields = [
            "type", "manufacturer", "model", "price", "seats", "beds",
            "transmission", "baseRate", "color", "location", "weight",
            "dimension", "utilities", "info"
        ];
        
        // Check for missing fields
        const missingFields = requiredFields.filter(field => !req.body[field]);
        if (missingFields.length > 0) {
            return res.status(400).json({
                error: `Missing required fields: ${missingFields.join(", ")}`
            });
        }

        const newVan = new Van({
            type: req.body.type,
            manufacturer: req.body.manufacturer,
            model: req.body.model,
            price: req.body.price,
            seats: req.body.seats,
            beds: req.body.beds,
            transmission: req.body.transmission,
            baseRate: req.body.baseRate,
            color: req.body.color,
            location: req.body.location,
            weight: req.body.weight,
            dimension: req.body.dimension,
            isAvailable: req.body.isAvailable || true,
            utilities: req.body.utilities,
            info: req.body.info
        });

        await newVan.save(); // Save the new van
        res.status(201).json({ message: "✅ Camper added successfully", camper: newVan }); //show the camper added
    } catch (error) {
        console.error("❌ Error adding camper:", error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};


exports.deleteCamper = async (req, res) => {
    try {
        if (req.user.user_type !== 'ADMIN') { //only admins can delete campers
            return res.status(403).json({ error: "Unauthorized: Admins only" });
        }

        const deletedVan = await Van.findByIdAndDelete(req.params.id); // Find and delete the camper
        if (!deletedVan) {
            return res.status(404).json({ error: "Camper not found" });
        }

        res.json({ message: "✅ Camper deleted successfully", deletedCamper: deletedVan }); //show the camper deleted
    } catch (error) {
        console.error("❌ Error deleting camper:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

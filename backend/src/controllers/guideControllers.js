/*

All methods for the guides

*/
const { Guide, User, Trip } = require("../models");

/// Create a new guide
const createGuide = async (req, res) => {
    try {
        const { title, duration, locations, notes } = req.body;

        if (duration <= 0) {
            return res.status(400).json({ message: "Duration must be a positive number" });
        }

        const newGuide = new Guide({
            user_id: req.user.id,
            title,
            duration,
            locations,
            notes,
            creation_date: new Date(),
            pictures: [] // Placeholder for future picture handling
        });

        await newGuide.save();
        res.status(201).json({ message: "Guide created successfully", guide: newGuide });
    } catch (error) {
        res.status(500).json({ message: "Error creating guide", error });
    }
};

// Get all guides with optional filtering
const getUserGuides = async (req, res) => {
    try {
        const { duration, location, startDate, endDate, title, username, sortBy, order } = req.query;
        let filter = {};

        if (duration) filter.duration = { $gte: Number(duration) };
        if (location) filter["locations.name"] = { $regex: new RegExp(location, "i") };
        if (startDate) filter.creation_date = { ...filter.creation_date, $gte: new Date(startDate) };
        if (endDate) filter.creation_date = { ...filter.creation_date, $lte: new Date(endDate) };
        if (title) filter.title = { $regex: new RegExp(title, "i") };

        if (username) {
            const users = await User.find({ name: { $regex: new RegExp(username, "i") } }, "_id");
            if (users.length > 0) {
                filter.user_id = { $in: users.map(user => user._id) };
            } else {
                return res.status(404).json({ message: "No users found with that name" });
            }
        }

        let sortOptions = {};
        if (sortBy) {
            sortOptions[sortBy] = order === "desc" ? -1 : 1;
        }

        const guides = await Guide.find(filter).populate("user_id", "name email").sort(sortOptions);
        res.status(200).json(guides);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving guides", error });
    }
};

// Get a single guide by ID with user information
const getGuideById = async (req, res) => {
    try {
        const guide = await Guide.findOne({ _id: req.params.id }).populate("user_id", "name email");
        if (!guide) return res.status(404).json({ message: "Guide not found" });
        res.status(200).json(guide);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving guide", error });
    }
};

// Update a guide
const updateGuide = async (req, res) => {
    try {
        const guide = await Guide.findOne({ _id: req.params.id, user_id: req.user.id });
        if (!guide) return res.status(404).json({ message: "Guide not found" });

        const updatedGuide = await Guide.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: "Guide updated successfully", guide: updatedGuide });
    } catch (error) {
        res.status(500).json({ message: "Error updating guide", error });
    }
};

// Delete a guide
const deleteGuide = async (req, res) => {
    try {
        const guide = await Guide.findOneAndDelete({ _id: req.params.id, user_id: req.user.id });
        if (!guide) return res.status(404).json({ message: "Guide not found" });

        res.status(200).json({ message: "Guide deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting guide", error });
    }
};

// Create a guide from a trip
const createGuideFromTrip = async (req, res) => {
    try {

        // Retrieve the trip by ID
        const trip = await Trip.findOne({ _id: req.body.trip_id, user_id: req.user.id });
        
        if (!trip) {
            return res.status(404).json({ message: "Trip not found" });
        }

        // Create the guide from the trip data
        const newGuide = new Guide({
            user_id: trip.user_id,
            title: trip.title,
            duration: (new Date(trip.end_date) - new Date(trip.start_date)),
            locations: trip.locations,
            notes: trip.notes,
            creation_date: new Date()
        });

        // Save the new guide
        await newGuide.save();

        res.status(201).json({ message: "Guide created from trip successfully", guide: newGuide });
    } catch (error) {
        res.status(500).json({ message: "Error creating guide from trip", error });
    }
};

// Get guide for a specific user
const getGuideByUserId = async (req, res) => {
    try {
      const { id } = req.user;
      console.log("Received user ID from route parameter:", id);
  
      const detail = await Guide.find({ user_id: id });
  
      console.log("Guide details found:", detail);
  
      if (!detail || detail.length === 0) {
        console.log("No guides found for this user.");
        return res.status(404).json({ message: "No guides found for this user." });
      }
  
      res.json(detail);
  
    } catch (error) {
      console.error("Server error:", error);
      res.status(500).json({ error: error.message });
    }
  };
  

module.exports = {
    createGuide,
    getUserGuides,
    getGuideById,
    updateGuide,
    deleteGuide,
    createGuideFromTrip,
    getGuideByUserId,
};

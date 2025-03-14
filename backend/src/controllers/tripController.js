/*

Method for creating a trip

*/

const { Trip } = require("../models");

/// Create a new trip
exports.createTrip = async (req, res) => {
    try {
        const { start_date, end_date, locations, notes } = req.body;

        // Ensure start_date is in the future
        if (new Date(start_date) < new Date()) {
            return res.status(400).json({ message: "Start date must be in the future" });
        }

        const newTrip = new Trip({
            user_id: req.user.id, // Extracted from authMiddleware
            start_date,
            end_date,
            locations,
            notes,
        });

        await newTrip.save();
        res.status(201).json({ message: "Trip created successfully", trip: newTrip });
    } catch (error) {
        res.status(500).json({ message: "Error creating trip", error });
    }
};

// Get all trips for the logged-in user
exports.getUserTrips = async (req, res) => {
    try {
        const trips = await Trip.find({ user_id: req.user.id });
        res.status(200).json(trips);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving trips", error });
    }
};

// Get a single trip by ID (only if it belongs to the user)
exports.getTripById = async (req, res) => {
    try {
        const trip = await Trip.findOne({ _id: req.params.id, user_id: req.user.id });
        if (!trip) return res.status(404).json({ message: "Trip not found" });

        res.status(200).json(trip);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving trip", error });
    }
};

// Update a trip (only if the start date is not due)
exports.updateTrip = async (req, res) => {
    try {
        const trip = await Trip.findOne({ _id: req.params.id, user_id: req.user.id });

        if (!trip) return res.status(404).json({ message: "Trip not found" });

        // Check if the trip's start date has already passed
        if (new Date(trip.start_date) <= new Date()) {
            return res.status(403).json({ message: "Cannot modify a trip after its start date" });
        }

        const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: "Trip updated successfully", trip: updatedTrip });
    } catch (error) {
        res.status(500).json({ message: "Error updating trip", error });
    }
};

// Delete a trip (only if it belongs to the user)
exports.deleteTrip = async (req, res) => {
    try {
        const trip = await Trip.findOneAndDelete({ _id: req.params.id, user_id: req.user.id });
        if (!trip) return res.status(404).json({ message: "Trip not found" });

        res.status(200).json({ message: "Trip deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting trip", error });
    }
};
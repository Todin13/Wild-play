/*

All methods for the Trips
Author: ODIN Thomas

*/
const { Trip, Guide } = require("../models");

/// Create a new trip
const createTrip = async (req, res) => {
  try {
    const {
      title,
      start_date,
      end_date,
      locations,
      notes,
      van_id,
      van_booked,
    } = req.body;

    if (new Date(start_date) < new Date()) {
      return res
        .status(400)
        .json({ message: "Start date must be in the future" });
    }

    const newTrip = new Trip({
      user_id: req.user.id,
      title,
      start_date,
      end_date,
      locations,
      notes,
      van_id: van_booked ? van_id : null,
      van_booked,
    });

    await newTrip.save();
    res
      .status(201)
      .json({ message: "Trip created successfully", trip: newTrip });
  } catch (error) {
    res.status(500).json({ message: "Error creating trip", error });
  }
};

// Get all trips for the logged-in user with optional filtering
const getUserTrips = async (req, res) => {
  try {
    const { start_date, end_date, location, sortBy, order } = req.query;
    let filter = { user_id: req.user.id };

    if (start_date) filter.start_date = { $gte: new Date(start_date) };
    if (end_date) filter.end_date = { $lte: new Date(end_date) };
    if (location)
      filter["locations.name"] = { $regex: new RegExp(location, "i") };

    let sortOptions = {};
    if (sortBy) {
      sortOptions[sortBy] = order === "desc" ? -1 : 1;
    }

    const trips = await Trip.find(filter).sort(sortOptions);
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving trips", error });
  }
};

// Get a single trip by ID
const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      user_id: req.user.id,
    });
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving trip", error });
  }
};

// Update a trip
const updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      user_id: req.user.id,
    });
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    if (new Date(trip.start_date) <= new Date()) {
      return res
        .status(403)
        .json({ message: "Cannot modify a trip after its start date" });
    }

    const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res
      .status(200)
      .json({ message: "Trip updated successfully", trip: updatedTrip });
  } catch (error) {
    res.status(500).json({ message: "Error updating trip", error });
  }
};

// Delete a trip
const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({
      _id: req.params.id,
      user_id: req.user.id,
    });
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    res.status(200).json({ message: "Trip deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting trip", error });
  }
};

// Create a trip from a guide with dates provided in the request
const createTripFromGuide = async (req, res) => {
  try {
    // Retrieve the guide by ID
    const guide = await Guide.findOne({ _id: req.body.guide_id });
    const { id } = req.user;

    if (!guide) {
      return res.status(404).json({ message: "Guide not found" });
    }

    // Destructure start_date and end_date from the request body
    const { start_date, end_date } = req.body;

    // Ensure the start_date and end_date are valid
    if (!start_date || !end_date) {
      return res
        .status(400)
        .json({ message: "Start date and end date are required" });
    }

    // Parse the dates to ensure they are valid Date objects
    const parsedStartDate = new Date(start_date);
    const parsedEndDate = new Date(end_date);

    if (isNaN(parsedStartDate)) {
      return res.status(400).json({ message: "Invalid start date format" });
    }
    if (isNaN(parsedEndDate)) {
      return res.status(400).json({ message: "Invalid end date format" });
    }

    // Check if start date is before end date
    if (parsedStartDate >= parsedEndDate) {
      return res
        .status(400)
        .json({ message: "End date must be after start date" });
    }

    // Create the trip from the guide data
    const newTrip = new Trip({
      user_id: id,
      title: guide.title, // Use the title from the guide
      start_date: parsedStartDate, // Use the parsed start date
      end_date: parsedEndDate, // Use the parsed end date
      locations: guide.locations, // Use the locations from the guide
      notes: guide.notes, // Use the notes from the guide
      van_id: null, // You can set this to a default or handle it based on the trip's requirements
      van_booked: false, // Set the default value for van_booked or handle it based on the trip's requirements
    });

    // Save the new trip
    await newTrip.save();

    res
      .status(201)
      .json({ message: "Trip created from guide successfully", trip: newTrip });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating trip from guide", error: error });
  }
};

module.exports = {
  createTrip,
  getUserTrips,
  getTripById,
  updateTrip,
  deleteTrip,
  createTripFromGuide,
};

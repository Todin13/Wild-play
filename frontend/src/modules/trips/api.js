import API from "@/utils/api"; // Import the Axios instance

// Create a new trip
export const createTrip = async (tripData) => {
  try {
    const response = await API.post("/trips", tripData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get all trips for the user with optional filtering
export const getUserTrips = async (filters = {}) => {
  try {
    const response = await API.get("/trips", { params: filters });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get a single trip by ID
export const getTripById = async (tripId) => {
  try {
    const response = await API.get(`/trips/${tripId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update a trip by ID
export const updateTrip = async (tripId, updatedData) => {
  try {
    const response = await API.put(`/trips/${tripId}`, updatedData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete a trip by ID
export const deleteTrip = async (tripId) => {
  try {
    const response = await API.delete(`/trips/${tripId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

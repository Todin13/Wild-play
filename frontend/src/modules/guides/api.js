// src/modules/guides/api.js
import API from '@/utils/api';

// Create a new guide
export const createGuide = async (guideData) => {
  try {
    const response = await API.post('/guides', guideData);
    return response.data;
  } catch (error) {
    console.error('Failed to create guide:', error);
    throw error;
  }
};

// Get all guides with optional filtering
export const getUserGuides = async (filters) => {
  try {
    const queryString = new URLSearchParams(filters).toString();
    const response = await API.get(`/guides?${queryString}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch guides:', error);
    throw error;
  }
};

// Get a specific guide by ID
export const getGuideById = async (id) => {
  try {
    const response = await API.get(`/guides/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch guide with ID ${id}:`, error);
    throw error;
  }
};

// Update a guide
export const updateGuide = async (id, guideData) => {
  try {
    const response = await API.put(`/guides/${id}`, guideData);
    return response.data;
  } catch (error) {
    console.error(`Failed to update guide with ID ${id}:`, error);
    throw error;
  }
};

// Delete a guide
export const deleteGuide = async (id) => {
  try {
    const response = await API.delete(`/guides/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to delete guide with ID ${id}:`, error);
    throw error;
  }
};

// Create a guide from a trip
export const createGuideFromTrip = async (tripId) => {
  try {
    const response = await API.post('/guides/fromTrip', { trip_id: tripId });
    return response.data;
  } catch (error) {
    console.error('Failed to create guide from trip:', error);
    throw error;
  }
};

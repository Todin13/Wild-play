// src/modules/vans/api.js
import API from '@/utils/api';

// Get all vans with optional filtering
export const getAllVans = async (filters) => {
  try {
    const queryString = new URLSearchParams(filters).toString();
    const response = await API.get(`/campers?${queryString}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch vans:', error);
    throw error;
  }
};

// Create a new van (camper)
export const createVan = async (vanData) => {
  try {
    const response = await API.post('/campers', vanData);
    return response.data;
  } catch (error) {
    console.error('Failed to create van:', error);
    throw error;
  }
};

// Get a specific van by ID
export const getVanById = async (id) => {
  try {
    const response = await API.get(`/campers/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch van with ID ${id}:`, error);
    throw error;
  }
};

// Update a van's details
export const updateVan = async (id, vanData) => {
  try {
    const response = await API.put(`/vans/${id}`, vanData);
    return response.data;
  } catch (error) {
    console.error(`Failed to update van with ID ${id}:`, error);
    throw error;
  }
};

// Delete a van (camper)
export const deleteVan = async (id) => {
  try {
    const response = await API.delete(`/campers/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to delete van with ID ${id}:`, error);
    throw error;
  }
};

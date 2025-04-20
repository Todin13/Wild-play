import { useState } from "react";
import { createTrip } from "@/modules/trips/api"; // Import the createTrip function from the API

// Custom hook to add a new trip
export const useAddTrip = () => {
  const [loading, setLoading] = useState(false);  // To manage loading state
  const [error, setError] = useState(null);  // To store any errors

  // Function to create a trip
  const addTrip = async (tripData) => {
    setLoading(true);  // Start loading
    setError(null);  // Reset previous errors

    try {
      const response = await createTrip(tripData);  // Call the API function
      return response;  // Return the response if successful
    } catch (err) {
      setError(err);  // Set error if the API call fails
      throw err;  // Re-throw the error for the caller to handle
    } finally {
      setLoading(false);  // End loading
    }
  };

  return {
    addTrip,
    loading,
    error,
  };
};

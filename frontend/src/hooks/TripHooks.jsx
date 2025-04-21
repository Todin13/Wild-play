import { useState } from "react";
import { createTrip, createTripFromGuide } from "@/modules/trips/api";

/** Hook to create a regular trip */
export const useAddTrip = () => {
  const [addTripLoading, setAddTripLoading] = useState(false);
  const [addTripError, setAddTripError] = useState(null);

  const addTrip = async (tripData) => {
    setAddTripLoading(true);
    setAddTripError(null);

    try {
      const response = await createTrip(tripData);
      return response;
    } catch (err) {
      setAddTripError(err);
      throw err;
    } finally {
      setAddTripLoading(false);
    }
  };

  return {
    addTrip,
    addTripLoading,
    addTripError,
  };
};

/** Hook to create a trip from a guide */
export const useCreateTripFromGuide = () => {
  const [createFromGuideLoading, setCreateFromGuideLoading] = useState(false);
  const [createFromGuideError, setCreateFromGuideError] = useState(null);

  const createFromGuide = async (data) => {
    setCreateFromGuideLoading(true);
    setCreateFromGuideError(null);

    try {
      const response = await createTripFromGuide(data);
      return response;
    } catch (err) {
      setCreateFromGuideError(err);
      throw err;
    } finally {
      setCreateFromGuideLoading(false);
    }
  };

  return {
    createFromGuide,
    createFromGuideLoading,
    createFromGuideError,
  };
};

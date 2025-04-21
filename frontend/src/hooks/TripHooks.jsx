import { useState, useCallback } from "react";
import {
  getUserTrips,
  getTripById,
  updateTrip,
  deleteTrip,
  createTrip,
  createTripFromGuide,
} from "@/modules/trips/api";

/** Create a regular trip */
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

/** Create a trip from a guide */
export const useCreateTripFromGuide = () => {
  const [createFromGuideLoading, setCreateFromGuideLoading] = useState(false);
  const [createFromGuideError, setCreateFromGuideError] = useState(null);

  const createFromGuide = async (guideId) => {
    setCreateFromGuideLoading(true);
    setCreateFromGuideError(null);

    try {
      const response = await createTripFromGuide(guideId);
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

/** Get all user trips */
export const useUserTrips = () => {
  const [trips, setTrips] = useState([]);
  const [tripsLoading, setTripsLoading] = useState(false);
  const [tripsError, setTripsError] = useState(null);

  const fetchTrips = useCallback(async (filters = {}) => {
    setTripsLoading(true);
    setTripsError(null);

    try {
      const data = await getUserTrips(filters);
      setTrips(data);
    } catch (err) {
      setTripsError(err);
    } finally {
      setTripsLoading(false);
    }
  }, []);

  return {
    trips,
    fetchTrips,
    tripsLoading,
    tripsError,
  };
};

/** Get a single trip by ID */
export const useTrip = (tripId) => {
  const [trip, setTrip] = useState(null);
  const [tripLoading, setTripLoading] = useState(false);
  const [tripError, setTripError] = useState(null);

  const fetchTrip = useCallback(async () => {
    if (!tripId) return;
    setTripLoading(true);
    setTripError(null);

    try {
      const data = await getTripById(tripId);
      setTrip(data);
    } catch (err) {
      setTripError(err);
    } finally {
      setTripLoading(false);
    }
  }, [tripId]);

  return {
    trip,
    fetchTrip,
    tripLoading,
    tripError,
  };
};

/** Update a trip */
export const useUpdateTrip = () => {
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  const update = async (tripId, updatedData) => {
    setUpdateLoading(true);
    setUpdateError(null);

    try {
      const data = await updateTrip(tripId, updatedData);
      return data;
    } catch (err) {
      setUpdateError(err);
      throw err;
    } finally {
      setUpdateLoading(false);
    }
  };

  return {
    updateTrip: update,
    updateLoading,
    updateError,
  };
};

/** Delete a trip */
export const useDeleteTrip = () => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const removeTrip = async (tripId) => {
    setDeleteLoading(true);
    setDeleteError(null);

    try {
      const data = await deleteTrip(tripId);
      return data;
    } catch (err) {
      setDeleteError(err);
      throw err;
    } finally {
      setDeleteLoading(false);
    }
  };

  return {
    removeTrip,
    deleteLoading,
    deleteError,
  };
};

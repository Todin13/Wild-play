/*

Link for react and the function linked to the backend for the guides
Author: ODIN Thomas

*/
import { useEffect, useState } from "react";
import {
  createGuide,
  getUserGuides,
  getGuideById,
  updateGuide,
  deleteGuide,
  createGuideFromTrip,
  getGuideByUserId,
} from "@/modules/guides/api";

// Hook to fetch first 10 guides (used for previews, homepage, etc.)
const useFirstTenGuides = () => {
  const [guides, setGuides] = useState([]);
  const [loading_guides, setLoading] = useState(true);
  const [error_guides, setError] = useState(null);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        setLoading(true);
        const result = await getUserGuides({});
        if (result && result.length > 0) {
          setGuides(result.slice(0, 10));
        } else {
          setError("No guides available.");
        }
      } catch (err) {
        setError(`Error fetching guides: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchGuides();
  }, []);

  return { guides, loading_guides, error_guides };
};

// Hook to fetch guides with filters and pagination
const useGuideSearch = (filters, page = 1, limit = 24) => {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGuides = async () => {
    setLoading(true);
    setError(null);
    try {
      const cleanedFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== "")
      );

      const paginatedFilters = {
        ...cleanedFilters,
        skip: (page - 1) * limit,
        limit,
      };

      const result = await getUserGuides(paginatedFilters);
      setGuides(result);
    } catch (err) {
      setError("Error fetching guides.");
      console.error("Error fetching guides:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuides();
  }, [JSON.stringify(filters), page]);

  return { guides, loading, error, refetch: fetchGuides };
};

// Hook to create a new guide
const useAddGuide = () => {
  const [creatingGuideLoading, setLoading] = useState(false);
  const [creatingGuideError, setError] = useState(null);

  const addGuide = async (guideData) => {
    setLoading(true);
    setError(null);
    try {
      const guide = await createGuide(guideData);
      return guide;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { addGuide, creatingGuideLoading, creatingGuideError };
};

// Hook to get a guide by ID
const useGuideById = (id) => {
  const [guide, setGuide] = useState(null);
  const [loadingGuide, setLoading] = useState(true);
  const [errorGuide, setError] = useState(null);

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        setLoading(true);
        const result = await getGuideById(id);
        setGuide(result);
      } catch (error) {
        setError("Error fetching guide.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchGuide();
  }, [id]);

  return { guide, loadingGuide, errorGuide };
};

// Hook to update a guide
const useUpdateGuide = () => {
  const [updatingGuideLoading, setLoading] = useState(false);
  const [updatingGuideError, setError] = useState(null);

  const update = async (id, data) => {
    setLoading(true);
    setError(null);
    try {
      return await updateGuide(id, data);
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { update, updatingGuideLoading, updatingGuideError };
};

// Hook to delete a guide
const useDeleteGuide = () => {
  const [deletingGuideLoading, setLoading] = useState(false);
  const [deletingGuideError, setError] = useState(null);

  const remove = async (id) => {
    setLoading(true);
    setError(null);
    try {
      return await deleteGuide(id);
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { remove, deletingGuideLoading, deletingGuideError };
};

// Hook to create a guide from a trip
const useCreateGuideFromTrip = () => {
  const [creatingFromTripLoading, setLoading] = useState(false);
  const [creatingFromTripError, setError] = useState(null);

  const createFromTrip = async (tripId) => {
    setLoading(true);
    setError(null);
    try {
      return await createGuideFromTrip(tripId);
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { createFromTrip, creatingFromTripLoading, creatingFromTripError };
};

const useGuideByUserId = () => {
  const [guideData, setGuideData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        setLoading(true);
        const data = await getGuideByUserId();
        setGuideData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGuide();
  }, []);

  return { guideData, loading, error };
};

export {
  useFirstTenGuides,
  useGuideSearch,
  useAddGuide,
  useGuideById,
  useUpdateGuide,
  useDeleteGuide,
  useCreateGuideFromTrip,
  useGuideByUserId,
};

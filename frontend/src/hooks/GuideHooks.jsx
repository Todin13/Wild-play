import { useState, useEffect } from "react";
import { getUserGuides } from "@/modules/guides/api";

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

// Hook to fetch guides with filters and support for pagination
const useGuideSearch = (filters, page = 1, limit = 24) => {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGuides = async () => {
    setLoading(true);
    setError(null);
    try {
      // Clean up filters by removing any keys with empty values
      const cleanedFilters = Object.fromEntries(
        Object.entries(filters).filter(([key, value]) => value !== "")
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


export { useFirstTenGuides, useGuideSearch };

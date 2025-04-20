import { useState, useEffect } from "react";
import { getVanReviews, getGuideReviews } from "@/modules/reviews/api"; // Importing the API methods

// Custom Hook to get all reviews for a specific van or guide
const useReviews = (type, id, userId = null, rating = null) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      setError(null);

      try {
        let fetchedReviews;
        if (type === "van") {
          fetchedReviews = await getVanReviews(id, userId, rating);
        } else if (type === "guide") {
          fetchedReviews = await getGuideReviews(id, userId, rating);
        }

        setReviews(fetchedReviews);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [type, id, userId, rating]);

  return { reviews, loading, error };
};

export { useReviews };

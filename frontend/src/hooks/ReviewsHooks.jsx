import { useState, useEffect } from "react";
import {
  getVanReviews,
  getGuideReviews,
  createVanReview,
  createGuideReview,
} from "@/modules/reviews/api"; // Importing the API methods

const useReviews = (type, id, userId = null, rating = null) => {
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false); // Renamed to reviewsLoading
  const [reviewsError, setReviewsError] = useState(null); // Renamed to reviewsError

  useEffect(() => {
    const fetchReviews = async () => {
      setReviewsLoading(true); // Use the renamed state
      setReviewsError(null); // Reset the error state

      try {
        let fetchedReviews;
        if (type === "van") {
          fetchedReviews = await getVanReviews(id, userId, rating);
        } else if (type === "guide") {
          fetchedReviews = await getGuideReviews(id, userId, rating);
        }

        setReviews(fetchedReviews);
      } catch (err) {
        setReviewsError(err.message); // Use the renamed state
      } finally {
        setReviewsLoading(false); // Use the renamed state
      }
    };

    fetchReviews();
  }, [type, id, userId, rating]);

  return { reviews, reviewsLoading, reviewsError }; // Return the renamed states
};

const useCreateReview = () => {
  const [createReviewLoading, setCreateReviewLoading] = useState(false); // Renamed to createReviewLoading
  const [createReviewError, setCreateReviewError] = useState(null); // Renamed to createReviewError
  const [createReviewSuccess, setCreateReviewSuccess] = useState(false); // Renamed to createReviewSuccess

  const createReview = async (type,rating, review) => {
    setCreateReviewLoading(true); // Use the renamed state
    setCreateReviewError(null); // Reset the error state
    setCreateReviewSuccess(false); // Reset the success state

    try {
      if (type === "van") {
        await createVanReview(rating, review);
      } else if (type === "guide") {
        await createGuideReview(rating, review);
      }

      setCreateReviewSuccess(true); // If review creation is successful
    } catch (err) {
      setCreateReviewError(err.message); // Use the renamed state
    } finally {
      setCreateReviewLoading(false); // Use the renamed state
    }
  };

  return {
    createReview,
    createReviewLoading,
    createReviewError,
    createReviewSuccess,
  }; // Return the renamed states
};

export { useReviews, useCreateReview };

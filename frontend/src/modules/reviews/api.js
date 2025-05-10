/*

Function to request on backend api for reviews
Author: ODIN Thomas

*/
import API from "@/utils/api";

// Van Reviews API
export const createVanReview = async (vanId, rating, review) => {
  try {
    const response = await API.post("/reviews/van", {
      van_id: vanId,
      rating,
      review,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error creating van review"
    );
  }
};

export const getVanReviews = async (vanId, userId = null, rating = null) => {
  try {
    const response = await API.get(`/reviews/van/${vanId}`, {
      params: { user_id: userId, rating: rating },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error fetching van reviews"
    );
  }
};

// Guide Reviews API
export const createGuideReview = async (guideId, rating, review) => {
  try {
    const response = await API.post("/reviews/guide", {
      guide_id: guideId,
      rating,
      review,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error creating guide review"
    );
  }
};

export const getGuideReviews = async (
  guideId,
  userId = null,
  rating = null
) => {
  try {
    const response = await API.get(`/reviews/guide/${guideId}`, {
      params: { user_id: userId, rating: rating },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error fetching guide reviews"
    );
  }
};

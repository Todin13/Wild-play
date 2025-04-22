import React, { useState } from "react";
import { useCreateReview } from "@/hooks/ReviewsHooks";
import Button from "@/components/ui/Buttons"; // Importing the Button component

const ReviewForm = ({ type, id, setShowReviewForm }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const { createReview, reviewsLoading, reviewsError, reviewsSuccess } =
    useCreateReview();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate that both rating and review are provided
    if (rating === 0 || review.trim() === "") {
      setErrorMessage("Please provide both a rating and a review.");
      return;
    }

    setErrorMessage(""); // Clear error if validation passes
    createReview(type, id, rating, review);
  };

  // Helper function to handle star click
  const handleStarClick = (value) => {
    setRating(value);
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
      <h3 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        Add Your Review
      </h3>
      <form onSubmit={handleSubmit}>
        {/* Star Rating */}
        <div className="mb-6">
          <label
            htmlFor="rating"
            className="block text-xl mb-4 font-medium text-gray-700"
          >
            Rating
          </label>
          <div className="flex items-center gap-4 justify-center">
            {[1, 2, 3, 4, 5].map((value) => (
              <svg
                key={value}
                xmlns="http://www.w3.org/2000/svg"
                fill={rating >= value ? "#fbbf24" : "#e5e7eb"} // Gold for selected, gray for unselected
                viewBox="0 0 24 24"
                width="3rem" // Larger star size
                height="3rem" // Larger star size
                onClick={() => handleStarClick(value)} // Set rating on click
                className="cursor-pointer transition-all duration-200 transform hover:scale-110"
              >
                <path d="M12 2l2.4 7.6h7.9l-6.4 4.8 2.4 7.6-6.4-4.8-6.4 4.8 2.4-7.6-6.4-4.8h7.9z" />
              </svg>
            ))}
          </div>
        </div>

        {/* Review Textarea */}
        <div className="mb-6">
          <label
            htmlFor="review"
            className="block text-xl mb-4 font-medium text-gray-700"
          >
            Review
          </label>
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows="6"
            className="border border-gray-300 rounded-lg p-4 w-full text-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
            placeholder="Write your review here..."
          />
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="mt-4 text-red-600 text-center">
            <p>{errorMessage}</p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-between gap-8 mt-8">
          <Button
            type="submit"
            variant="primary"
            disabled={reviewsLoading}
            className="w-full py-3 text-lg"
          >
            {reviewsLoading ? "Submitting..." : "Submit Review"}
          </Button>

          <Button
            type="button"
            variant="primary"
            onClick={() => setShowReviewForm(false)} // Close modal when cancel is clicked
            className="w-full py-3 text-lg"
          >
            Cancel
          </Button>
        </div>
      </form>

      {/* Show Success or Error Message */}
      {reviewsSuccess && (
        <p className="mt-4 text-green-600 text-xl text-center">
          Review submitted successfully!
        </p>
      )}
      {reviewsError && (
        <div className="mt-4 text-red-600 text-xl text-center">
          <p>
            Error occurred while submitting your review. Please try again later.
          </p>
          <p className="mt-2">{reviewsError}</p> {/* Display the actual error message */}
        </div>
      )}
    </div>
  );
};

export default ReviewForm;

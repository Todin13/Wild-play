import React from "react";

const ReviewCard = ({ username, rating, review }) => {
  // Function to generate star icons based on the rating
  const renderStars = (rating) => {
    const filledStars = Math.round(rating); // Round rating to nearest whole number
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          fill={i <= filledStars ? "yellow" : "gray"}
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7"
        >
          <path
            fillRule="evenodd"
            d="M12 17.27l6.18 3.73-1.64-7.03 5.45-4.73-7.19-.61L12 2 9.2 8.63l-7.19.61 5.45 4.73-1.64 7.03L12 17.27z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="max-w-xs w-full bg-white border border-gray-200 rounded-lg shadow-lg p-6 flex flex-col items-center text-center transition-all hover:shadow-xl hover:scale-105">
      {/* User Info */}
      <h3 className="text-xl sm:text-lg md:text-xl lg:text-2xl font-semibold mb-2">
        {username}
      </h3>

      {/* Rating stars */}
      <div className="flex space-x-1 mb-4">
        {renderStars(rating)}
      </div>

      {/* Review Text */}
      <p className="text-md sm:text-sm md:text-lg lg:text-xl text-gray-700 italic">
        {review}
      </p>
    </div>
  );
};

export default ReviewCard;

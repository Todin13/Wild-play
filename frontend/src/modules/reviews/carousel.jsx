/*

Component to display reviews info and switch between
Author: ODIN Thomas

*/
import { useState } from "react";
import ReviewCard from "@/components/ui/ReviewCard"; // Assuming you already have ReviewCard component

const ReviewCarousel = ({ reviews = [] }) => {
  const [index, setIndex] = useState(0);
  const total = reviews.length;

  const prev = (index - 1 + total) % total;
  const next = (index + 1) % total;

  const handlePrev = () => setIndex(prev);
  const handleNext = () => setIndex(next);

  return (
    <div className="relative mx-auto overflow-hidden py-12 px-4 flex justify-center items-center">
      {/* Desktop layout (lg and up) */}
      <div className="hidden lg:flex justify-center items-center gap-6">
        <div className="flex-1 transform scale-90 opacity-70 transition-all duration-300">
          {reviews[prev] && <ReviewCard {...reviews[prev]} />}
        </div>

        <div className="flex-[1.5] transform scale-105 opacity-100 transition-all duration-300 relative z-10">
          {reviews[index] && <ReviewCard {...reviews[index]} />}
        </div>

        <div className="flex-1 transform scale-90 opacity-70 transition-all duration-300">
          {reviews[next] && <ReviewCard {...reviews[next]} />}
        </div>
      </div>

      {/* Mobile + Medium layout (below lg) */}
      <div className="flex lg:hidden flex-col items-center gap-6">
        <div
          onClick={handleNext}
          className="w-full cursor-pointer relative transition-all duration-300"
        >
          {reviews[index] && <ReviewCard {...reviews[index]} />}
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {reviews.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? "w-6 bg-deepgreen" : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Navigation Arrows for Desktop */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden lg:block">
        <button
          onClick={handlePrev}
          className="p-3 bg-white rounded-full shadow hover:bg-gray-100 transition"
        >
          ←
        </button>
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden lg:block">
        <button
          onClick={handleNext}
          className="p-3 bg-white rounded-full shadow hover:bg-gray-100 transition"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default ReviewCarousel;

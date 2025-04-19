import { useState } from "react";
import VanCard from "@/components/ui/VanCard"; // Import your VanCard component

const VanCarousel = ({ vans = [] }) => {
  const [index, setIndex] = useState(0);
  const total = vans.length;

  const prev = (index - 1 + total) % total;
  const next = (index + 1) % total;

  const handlePrev = () => setIndex(prev);
  const handleNext = () => setIndex(next);

  return (
    <div className="relative w-full mx-auto overflow-hidden py-12 px-4">
      {/* Desktop layout (lg and up) */}
      <div className="hidden lg:flex justify-center items-center gap-6 h-full">
        <div className="flex-1 transform scale-90 opacity-70 transition-all duration-300 max-h-full">
          {vans[prev] && <VanCard van={vans[prev]} />}
        </div>

        <div className="flex-[1.5] transform scale-105 opacity-100 transition-all duration-300 relative z-10 max-h-full">
          {vans[index] && <VanCard van={vans[index]} />}
        </div>

        <div className="flex-1 transform scale-90 opacity-70 transition-all duration-300 max-h-full">
          {vans[next] && <VanCard van={vans[next]} />}
        </div>
      </div>

      {/* Mobile + Medium layout (below lg) */}
      <div className="flex lg:hidden flex-col items-center gap-6 h-full w-full max-w-[90vw] mx-auto">
        <div
          onClick={handleNext}
          className="w-full h-full cursor-pointer relative transition-all duration-300"
        >
          {vans[index] && <VanCard van={vans[index]} />}
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {vans.map((_, i) => (
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

export default VanCarousel;

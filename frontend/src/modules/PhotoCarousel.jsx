/*

Component to display and switch between them
Author: ODIN Thomas

*/
import { useState } from "react";

const PhotoCarousel = ({ photos = [] }) => {
  const [index, setIndex] = useState(0);
  const total = photos.length;

  const prev = (index - 1 + total) % total;
  const next = (index + 1) % total;

  const handlePrev = () => setIndex(prev);
  const handleNext = () => setIndex(next);

  return (
    <div className="relative w-full mx-auto overflow-hidden py-12 px-4">
      {/* Desktop layout (horizontal) */}
      <div className="desktop-only flex justify-center items-center gap-6 h-full">
        {/* Previous Image */}
        <div className="flex-1 transform scale-90 opacity-70 transition-all duration-300 max-h-full">
          <img
            src={photos[prev].src}
            alt={photos[prev].alt}
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Current Image */}
        <div className="flex-[1.5] transform scale-105 opacity-100 transition-all duration-300 relative z-10 max-h-full">
          <img
            src={photos[index].src}
            alt={photos[index].alt}
            className="w-full h-full object-cover rounded-2xl shadow-2xl"
          />
          <div className="absolute bottom-0 w-full bg-white/90 text-black text-center py-4 text-xl font-semibold rounded-b-2xl">
            {photos[index].caption}
          </div>
        </div>

        {/* Next Image */}
        <div className="flex-1 transform scale-90 opacity-70 transition-all duration-300 max-h-full">
          <img
            src={photos[next].src}
            alt={photos[next].alt}
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>
      </div>

      {/* Mobile layout (vertical with tap to switch) */}
      <div className="mobile-only flex flex-col items-center gap-6 h-full w-full max-h-[70vh] max-w-[90vw] mx-auto">
        <div
          onClick={handleNext}
          className="w-full h-full cursor-pointer relative transition-all duration-300"
        >
          <img
            src={photos[index].src}
            alt={photos[index].alt}
            className="w-full h-full object-cover rounded-2xl shadow-2xl"
          />
          <div className="absolute bottom-0 w-full bg-white/90 text-black text-center py-4 text-lg font-semibold rounded-b-2xl">
            {photos[index].caption}
          </div>
        </div>
        {/* Index Indicator (Mobile Only) */}
        <div className="flex justify-center gap-2 mt-4">
          {photos.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? "w-6 bg-deepgreen" : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Navigation Arrows - Hidden on Mobile */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 desktop-only">
        <button
          onClick={handlePrev}
          className="p-3 bg-white rounded-full shadow hover:bg-gray-100 transition"
        >
          ←
        </button>
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 desktop-only">
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

export default PhotoCarousel;

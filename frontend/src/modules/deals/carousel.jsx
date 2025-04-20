import React, { useState, useRef, useEffect } from 'react';
import { DealCard } from '@/components/ui/DealCard';

/**
 * DealsCarousel displays a sliding carousel of deal cards,
 * showing 4 cards per view and sliding one card at a time.
 * Props:
 * - deals: array of deal objects
 */
export default function DealsCarousel({ deals = [] }) {
  const visibleCount = 4;
  const total = deals.length;
  const maxIndex = Math.max(0, total - visibleCount);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const [gap, setGap] = useState(0);

  // Read the CSS gap property once
  useEffect(() => {
    if (carouselRef.current) {
      const style = getComputedStyle(carouselRef.current);
      setGap(parseInt(style.gap, 10) || 0);
    }
  }, []);

  // Update transform when index or gap change
  useEffect(() => {
    if (!carouselRef.current) return;
    const card = carouselRef.current.children[currentIndex];
    if (!card) return;
    const shift = card.offsetWidth * currentIndex + gap * currentIndex;
    carouselRef.current.style.transform = `translateX(-${shift}px)`;
  }, [currentIndex, gap]);

  const handlePrev = () => {
    setCurrentIndex(i => (i <= 0 ? maxIndex : i - 1));
  };

  const handleNext = () => {
    setCurrentIndex(i => (i >= maxIndex ? 0 : i + 1));
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Carousel track */}
      <div
        ref={carouselRef}
        className="flex gap-4 transition-transform duration-500 ease-in-out"
      >
        {deals.map(deal => (
          <div key={deal.id || deal._id} className="flex-none w-1/4">
            <DealCard deal={deal} />
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow hover:bg-gray-100 transition z-10"
      >
        ‹
      </button>
      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow hover:bg-gray-100 transition z-10"
      >
        ›
      </button>
    </div>
  );
}

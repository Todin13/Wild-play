/*

Component to display small deal info and switch between
Author: HERVET Thibaut

*/
import React, { useState, useRef, useEffect } from 'react';
import { DealCard } from '@/components/ui/DealCard';
import { useDeals } from '@/hooks/DealsHooks';

/**
 * DealsCarousel displays a sliding carousel of deal cards,
 * showing 4 cards per view and sliding one card at a time.
 */
export default function DealsCarousel() {
  const visibleCount = 4;
  const carouselRef = useRef(null);
  const [gap, setGap] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { deals, loading, error } = useDeals();
  const total = deals.length;
  const maxIndex = Math.max(0, total - visibleCount);

  // Read the CSS gap property once
  useEffect(() => {
    if (carouselRef.current) {
      const style = getComputedStyle(carouselRef.current);
      setGap(parseInt(style.gap, 10) || 0);
    }
  }, []);

  // Update transform when index or gap change
  useEffect(() => {
    if (!carouselRef.current || deals.length === 0) return;
  
    // Comment this block just for testing
    // const card = carouselRef.current.children[currentIndex];
    // if (!card) return;
    // const shift = card.offsetWidth * currentIndex + gap * currentIndex;
    // carouselRef.current.style.transform = `translateX(-${shift}px)`;
  
    console.log('Carousel render check:', deals.length);
  }, [currentIndex, gap, deals.length]);

  const handlePrev = () => {
    setCurrentIndex(i => (i <= 0 ? maxIndex : i - 1));
  };

  const handleNext = () => {
    setCurrentIndex(i => (i >= maxIndex ? 0 : i + 1));
  };

  if (loading) return <div>Loading deals...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="relative w-full overflow-hidden">
      {/* Carousel track */}
      <div
        ref={carouselRef}
        className="flex gap-4 transition-transform duration-500 ease-in-out"
      >
        {deals.map((deal) => (
          <DealCard key={deal._id} deal={deal} />
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

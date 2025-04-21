import { useState, useRef, useLayoutEffect } from "react";
import VanCard from "@/components/ui/VanCard";

/**
 * Slides exactly one card per arrow click, 
 * always showing 4 full cards.
 */
export default function CamperCarousel({ vans = [] }) {
  const visibleCount = 4;
  const total = vans.length;
  const maxIndex = total - visibleCount;
  const [index, setIndex] = useState(0);
  const viewportRef = useRef(null);

  // On index change, slide the inner list by cardWidth+gap px:
  useLayoutEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const card = vp.querySelector(".van-card");  // each VanCard wrapper
    const gap = parseInt(getComputedStyle(vp).gap, 10) || 0;
    const shift = (card.offsetWidth + gap) * index;
    vp.style.transform = `translateX(-${shift}px)`;
  }, [index]);

  const prev = () => setIndex(i => (i === 0 ? maxIndex : i - 1));
  const next = () => setIndex(i => (i === maxIndex ? 0 : i + 1));

  return (
    <div className="relative overflow-hidden h-96">
      {/* 4‑card window */}
      <div 
        ref={viewportRef}
        className="flex gap-6 transition-transform duration-500 ease-in-out"
        style={{ cursor: "grab" }}
      >
        {vans.map(van => (
          <div key={van._id} className="flex-none w-1/4 van-card">
            <VanCard van={van} />
          </div>
        ))}
      </div>

      {/* Arrows sit outside the cards */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white shadow rounded-full z-10"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white shadow rounded-full z-10"
      >
        ›
      </button>
    </div>
  );
}

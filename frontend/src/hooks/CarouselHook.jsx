import { useEffect, useRef, useState } from "react";

const useCarousel = (items, interval = 3000) => {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, interval);

    return () => clearInterval(timerRef.current);
  }, [items.length, interval]);

  return { currentItem: items[index], index };
};

export default useCarousel;

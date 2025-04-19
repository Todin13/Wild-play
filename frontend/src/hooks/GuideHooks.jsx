import { useState, useEffect } from "react";
import { getUserGuides } from "@/modules/guides/api";

const useFirstGuide = () => {
  const [firstGuide, setFirstGuide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFirstGuide = async () => {
      try {
        setLoading(true);
        const guides = await getUserGuides({});
        if (guides && guides.length > 0) {
          setFirstGuide(guides[0]); // Set the first guide
        } else {
          setError("No guides available");
        }
      } catch (err) {
        setError(`Error fetching guides: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchFirstGuide();
  }, []); // Only run once when the component mounts

  return { firstGuide, loading, error };
};

export { useFirstGuide };

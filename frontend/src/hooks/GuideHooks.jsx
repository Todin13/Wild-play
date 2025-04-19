import { useState, useEffect } from "react";
import { getUserGuides } from "@/modules/guides/api";

const useFirstTenGuides = () => {
  const [guides, setGuides] = useState([]);
  const [loading_guides, setLoading] = useState(true);
  const [error_guides, setError] = useState(null);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        setLoading(true);
        const result = await getUserGuides({});
        if (result && result.length > 0) {
          setGuides(result.slice(0, 10));
        } else {
          setError("No guides available");
        }
      } catch (err) {
        setError(`Error fetching guides: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchGuides();
  }, []);

  return { guides, loading_guides, error_guides };
};

export {useFirstTenGuides };

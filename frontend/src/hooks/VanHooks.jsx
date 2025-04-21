import { useState, useEffect } from "react";
import { getAllVans } from "@/modules/vans/api.js";

// Custom hook to get the first 10 distinct types of vans
const useTypesVans = () => {
  const [vans, setVans] = useState([]);
  const [loading_van, setLoading] = useState(true);
  const [error_van, setError] = useState(null);

  useEffect(() => {
    const fetchVans = async () => {
      try {
        // Fetch all vans with no filters for now
        const response = await getAllVans({});
        const allVans = response.campers;

        // Get unique types of vans
        const uniqueTypes = [];
        const uniqueVans = [];

        // Loop through all vans to filter unique types
        allVans.forEach((van) => {
          if (!uniqueTypes.includes(van.type)) {
            uniqueTypes.push(van.type);
            uniqueVans.push(van);
          }
        });

        // Limit to the first 10 unique van types
        setVans(uniqueVans.slice(0, 10));
      } catch (err) {
        console.error("Error fetching vans:", err);
        setError("Failed to fetch vans");
      } finally {
        setLoading(false);
      }
    };

    fetchVans();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return { vans, loading_van, error_van };
};

export { useTypesVans };

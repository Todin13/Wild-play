import React, { useState, useEffect, useCallback } from "react";
import MainLayout from "@/layouts/MainLayout";
import { CircularProgress } from "@heroui/react";
import CampersCarousel from "@/modules/vans/CampersCarousel";
import CamperSidebar from "@/components/CamperSidebar";
import { useLocation } from "react-router-dom";
import MountainSVG from "@/assets/images/mountain-svg";
import API from "@/utils/api";
import Title from "@/components/ui/Titles";

export default function Campervans() {
  const location = useLocation();
  const { start, end } = location.state || {}; // Get start and end from location.state

  const [vansByType, setVansByType] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize filters with start and end dates from location.state
  const [filters, setFilters] = useState({
    manufacturer: "",
    transmission: "",
    type: "",
    startDate: start || null,  // Set startDate from location.state
    endDate: end || null,      // Set endDate from location.state
  });

  const handleChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateRange = ({ startDate, endDate }) => {
    setFilters((prev) => ({ ...prev, startDate, endDate }));
  };

  const handleReset = () => {
    setFilters({
      manufacturer: "",
      transmission: "",
      type: "",
      startDate: null,
      endDate: null,
    });
    fetchCampers(); // Reset campers too
  };

  //check if both dates are selected
  const hasDatesSelected = filters.startDate && filters.endDate;

  //fetch campers with filters
  const fetchCampers = useCallback(async (optionalFilters = filters) => {
    //fetch if both dates are selected
    if (!optionalFilters.startDate || !optionalFilters.endDate) {
      setVansByType({});
      return;
    }

    setLoading(true);
    try {
      const params = {};
  
      if (optionalFilters.startDate && optionalFilters.endDate) {
        params.start_date = optionalFilters.startDate;
        params.end_date = optionalFilters.endDate;
      }
  
      if (optionalFilters.manufacturer) params.manufacturer = optionalFilters.manufacturer;
      if (optionalFilters.transmission) params.transmission = optionalFilters.transmission;
      if (optionalFilters.type) params.type = optionalFilters.type;
  
      const response = await API.get("/bookings/available_campers", { params });
  
      const items = response.data.availableCampers || [];
  
      const grouped = items.reduce((acc, van) => {
        const type = van.type || "other";
        if (!acc[type]) acc[type] = [];
        acc[type].push(van);
        return acc;
      }, {});
  
      setVansByType(grouped);
      setError(null);
    } catch (err) {
      console.error("Error loading campers:", err);
      setError("Could not load campers.");
      setVansByType({});
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Effect to trigger fetching campers on filter change
  useEffect(() => {
    fetchCampers();
  }, [fetchCampers]);

  return (
    <MainLayout>
      <div className="fixed bottom-0 left-0 w-full z-[-1] pointer-events-none transform xl:translate-y-[30%]">
        <MountainSVG className="w-full h-auto object-cover text-mountain-deepgreen" />
      </div>

      <section className="relative z-10 px-4 lg:px-12 py-12 flex flex-col xl:flex-row gap-12 mx-auto xl:min-w-[90vw] max-w-screen-xl">
        <aside className="w-full xl:w-1/4 top-24 self-start xl:block">
          <CamperSidebar
            filters={filters}
            onChange={handleChange}
            onSearch={() => fetchCampers()}
            onReset={handleReset}
            onDateRange={handleDateRange}
          />
        </aside>

        <div className="w-full xl:w-3/4">
          {!hasDatesSelected ? (
            <div className="w-auto flex flex-col items-center justify-center h-64 rounded-2xl shadow-lg border bg-white/85 backdrop-blur-md transition-all duration-200">
              <Title className="text-lg text-center mb-4">
                Please select your booking dates to see available campers
              </Title>
            </div>
          ) : loading ? (
            <div className="flex justify-center items-center h-40">
              <CircularProgress aria-label="Loading vans" />
            </div>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : Object.keys(vansByType).length === 0 ? (
            <p className="text-center">No campers available for the selected dates.</p>
          ) : (
            Object.entries(vansByType).map(([type, vans]) => (
              <div key={type}>
                <h2 className="text-2xl font-bold capitalize mb-4">{type} vans</h2>
                <CampersCarousel 
                  vans={vans.map(van => ({
                    ...van,
                    startDate: filters.startDate,
                    endDate: filters.endDate
                  }))} 
                  visibleCount={4} 
                />
              </div>
            ))
          )}
        </div>
      </section>
    </MainLayout>
  );
}
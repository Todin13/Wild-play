import React, { useState, useEffect, useCallback } from "react";
import MainLayout from "@/layouts/MainLayout";
import { CircularProgress } from "@heroui/react";
import BannerImage from "@/components/ui/BannerImage";
import CampersCarousel from "@/modules/vans/CampersCarousel";
import CamperSidebar from "@/components/CamperSidebar";
import MountainSVG from "@/assets/images/mountain-svg";
import API from "@/utils/api";

export default function Campervans() {
  const [vansByType, setVansByType] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCampers = useCallback(async (filters = null) => {
    setLoading(true);
    try {
      const response = filters
        ? await API.get("/bookings/available_campers", {
            params: {
              start_date: filters.startDate,
              end_date: filters.endDate,
            },
          })
        : await API.get("/campers");

      const items = response.data.availableCampers || response.data.campers || [];

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
  }, []);

  useEffect(() => {
    fetchCampers(); // Load all vans on first render
  }, [fetchCampers]);

  return (
    <MainLayout>
       {/* Fixed Mountain Background at Bottom */}
        <div className="fixed bottom-0 left-0 w-full z-[-1] pointer-events-none transform xl:translate-y-[30%]">
          <MountainSVG className="w-full h-auto object-cover text-mountain-deepgreen" />
        </div>
     
      <section className="relative z-10 px-4 lg:px-12 py-12 flex flex-col xl:flex-row gap-12 mx-auto xl:min-w-[90vw] max-w-screen-xl">
        {/* Sidebar for filters */}
        <aside className="w-full xl:w-1/4 top-24 self-start xl:block">
        <CamperSidebar onApply={fetchCampers} />
      </aside>
        {/* Vans display */}
        <div className="w-full xl:w-3/4">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <CircularProgress aria-label="Loading vans" />
            </div>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : Object.keys(vansByType).length === 0 ? (
            <p className="text-center">No campers available.</p>
          ) : (
            Object.entries(vansByType).map(([type, vans]) => (
              <div key={type}>
                <h2 className="text-2xl font-bold capitalize mb-4">{type} vans</h2>
                <CampersCarousel vans={vans} visibleCount={4} />
              </div>
            ))
          )}
        </div>
      </section>
    </MainLayout>
  );
}

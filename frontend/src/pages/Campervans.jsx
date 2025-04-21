import React, { useState, useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { CircularProgress } from '@heroui/react';
import { getAllVans } from '@/modules/vans/apis';
import CampersCarousel from '@/modules/vans/CampersCarousel';
import BannerImage from '@/components/ui/BannerImage';

export default function Campervans() {
  const [vansByType, setVansByType] = useState({});
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchVans() {
      setLoading(true);
      try {
        const data = await getAllVans({});
        const items = Array.isArray(data.campers) ? data.campers : data;
        const total = typeof data.count === 'number' ? data.count : items.length;

        // Group vans by type
        const grouped = items.reduce((acc, van) => {
          const type = van.type || 'other';
          if (!acc[type]) acc[type] = [];
          acc[type].push(van);
          return acc;
        }, {});

        setVansByType(grouped);
        setCount(total);
      } catch (err) {
        console.error('Failed to load vans:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchVans();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress aria-label="Loading vans" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Error loading vans: {error}</p>
      </div>
    );
  }

  return (
    <MainLayout>
      <BannerImage />
      <div className="max-w-7xl mx-auto space-y-12 px-4">
        {Object.entries(vansByType).map(([type, vans]) => (
          <div key={type}>
            <h2 className="text-2xl font-bold capitalize mb-4">{type} vans</h2>
            <CampersCarousel vans={vans} visibleCount={4} />
          </div>
        ))}
      </div>
    </MainLayout>
  );
}

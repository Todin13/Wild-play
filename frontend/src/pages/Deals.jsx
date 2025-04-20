import React, { useState, useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { getAllDeals } from '@/modules/deals/api';
import { DealCard } from '@/components/ui/DealCard';
import { CircularProgress } from '@heroui/react';

export default function Deals() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllDeals();
        setDeals(data);
      } catch (err) {
        setError(err.message || 'Failed to load deals');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <CircularProgress aria-label="Loading deals" />
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-red-500">Error: {error}</p>
    </div>
  );

  return (
    <MainLayout>
      {/* Hero Banner */}
      <div className="relative w-full h-64 bg-cover bg-center mb-8" style={{ backgroundImage: "url('/images/deals-hero.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Europe Deals</h1>
        </div>
      </div>

      {/* Deals Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {deals.map(deal => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

/*

Deals Page
Author: Hervet Thibaut

*/
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import DealsCarousel from '@/modules/deals/carousel';
import { CircularProgress } from '@heroui/react';
import MountainSVG from '@/assets/images/mountain-svg';
import { useDeals } from '@/hooks/DealsHooks';

export default function Deals() {
  const { deals, loading, error } = useDeals();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress aria-label="Loading deals" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <MainLayout>
      {/* Fixed Mountain Background at Bottom */}
      <div className="fixed bottom-0 left-0 w-full z-[-1] pointer-events-none transform xl:translate-y-[30%]">
          <MountainSVG className="w-full h-auto object-cover text-mountain-deepgreen" />
        </div>

      {/* Deals Carousel Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Current Deals</h2>

        {deals.length === 0 ? (
          <p className="text-gray-500 text-center">No deals available at the moment.</p>
        ) : (
          <DealsCarousel dealsList={deals} />
        )}
      </div>
    </MainLayout>
  );
}

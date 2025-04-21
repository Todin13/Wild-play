import React, { useState, useEffect } from 'react';
import { MapPinIcon, TruckIcon } from '@heroicons/react/24/outline';
import { getVanById } from '@/modules/vans/api.js'; // Assuming the correct import path

export function DealCard({ deal }) {
  const [van, setVan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dealVanId = deal?.van_id || '';

  useEffect(() => {
    const fetchVan = async () => {
      if (!dealVanId) return; // Early exit if there's no van_id

      try {
        const fetchedVan = await getVanById(dealVanId);
        setVan(fetchedVan);  // Store fetched van details
      } catch (err) {
        setError('Failed to fetch van details');
        console.error('Error fetching van details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVan();
  }, [dealVanId]); // Fetch when vanId changes

  // If van is not loaded yet, show loading spinner
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 text-center">Loading...</div>
    );
  }

  // If there was an error fetching van details, show error message
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 text-center text-red-500">{error}</div>
    );
  }

  const {
    manufacturer = fetchedVan.manufacturer || 'Manufacturer not available',
    model = fetchedVan.model || 'Model not available',
    type = fetchedVan.type || 'Type not available',  
    location = fetchedVan.location || 'Location not available',
    seats = fetchedVan.seats || 'N/A',
    beds = fetchedVan.beds || 'N/A',
    transmission = fetchedVan.transmission || 'N/A',
    price = fetchedVan.price || 'N/A',
  } = van || {};

  const discount = parseFloat(deal?.discount) || 0;
  const originalPrice = parseFloat(price) || 0;
  const discountedPrice = (originalPrice * (1 - discount / 100)).toFixed(2);

  const specs = [
    `Seats: ${seats}`,
    `Beds: ${beds}`,
    `Transmission: ${transmission}`,
  ];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {manufacturer} {model}
        </h3>

        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {type}
        </h3> 

        <div className="flex items-center text-sm text-gray-600 mb-2">
          <MapPinIcon className="w-5 h-5 mr-1 text-gray-500" />
          {location}
        </div>

        <ul className="flex-1 space-y-1 text-sm text-gray-700 mb-4">
          {specs.map((spec, i) => (
            <li key={i} className="flex items-center">
              <TruckIcon className="w-4 h-4 mr-1 text-gray-500" />
              {spec}
            </li>
          ))}
        </ul>

        <div className="mb-4">
          <div className="flex items-baseline space-x-2">
            <span className="text-xl font-bold text-green-600">€{discountedPrice}</span>
            {discount > 0 && (
              <span className="text-sm line-through text-gray-400">€{originalPrice.toFixed(2)}</span>
            )}
          </div>
          <span className="text-xs text-gray-500">/ day</span>
        </div>

        <div className="mt-auto flex space-x-2">
          <a
          
            className="flex-1 text-center py-2 border border-green-600 text-green-600 rounded hover:bg-green-50 transition"
          >
            More info
          </a>
          <a
            className="flex-1 text-center py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Book now
          </a>
        </div>
      </div>
    </div>
  );
}

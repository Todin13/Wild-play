import React from 'react';
import { CurrencyDollarIcon, MapPinIcon, TruckIcon } from '@heroicons/react/24/outline';

/**
 * DealCard renders a single deal card with image, title, specs, price, and CTAs.
 * Props:
 * - deal: object with fields { id, title, imageUrl, location, price, baseRate, specs: [], linkInfo, linkBook }
 */
export function DealCard({ deal }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      {/* Deal image */}
      <img src={deal.imageUrl} alt={deal.title} className="w-full h-40 object-cover" />

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{deal.title}</h3>

        {/* Location */}
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <MapPinIcon className="w-5 h-5 mr-1 text-gray-500" />
          {deal.location}
        </div>

        {/* Specs list */}
        <ul className="flex-1 space-y-1 text-sm text-gray-700 mb-4">
          {deal.specs.map((spec, i) => (
            <li key={i} className="flex items-center">
              <TruckIcon className="w-4 h-4 mr-1 text-gray-500" />
              {spec}
            </li>
          ))}
        </ul>

        {/* Pricing */}
        <div className="mb-4">
          <div className="flex items-baseline space-x-2">
            <span className="text-xl font-bold text-green-600">€{deal.price}</span>
            <span className="text-sm line-through text-gray-400">€{deal.baseRate}</span>
          </div>
          <span className="text-xs text-gray-500">/ day</span>
        </div>

        {/* CTAs */}
        <div className="mt-auto flex space-x-2">
          <a
            href={deal.linkInfo}
            className="flex-1 text-center py-2 border border-green-600 text-green-600 rounded hover:bg-green-50 transition"
          >
            More info
          </a>
          <a
            href={deal.linkBook}
            className="flex-1 text-center py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Book now
          </a>
        </div>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { MapPinIcon, TruckIcon } from "@heroicons/react/24/outline"; // Assuming you're using Heroicons
import { getAllVans } from "@/modules/vans/api.js";
import {Button} from "@heroui/react";
import { useNavigate } from "react-router-dom";
 // Assuming the API file for vans is the same

/**
 * DealCard displays the information about a deal and the associated van.
 * It fetches van details based on the van_id present in the deal object.
 */
export const DealCard = ({ deal }) => {
  const [van, setVan] = useState(null);
  const [loadingVan, setLoadingVan] = useState(true);
  const [errorVan, setErrorVan] = useState(null);

   const navigate = useNavigate();

  useEffect(() => {
    const fetchVan = async () => {
      try {
        // Fetch vans based on the van_id from the deal
        const response = await getAllVans({});
        const foundVan = response.campers.find(van => van._id === deal.van_id);
        if (foundVan) {
          setVan(foundVan);
        } else {
          setErrorVan("Van not found");
        }
      } catch (err) {
        console.error("Error fetching van:", err);
        setErrorVan("Failed to fetch van data");
      } finally {
        setLoadingVan(false);
      }
    };

    fetchVan();
  }, [deal.van_id]);

  const handleBookingClick = () => {
    navigate("/bookings/new", {
      state: { van, startDate, endDate },
    });
  };


  if (loadingVan) {
    return <div>Loading van information...</div>;
  }

  if (errorVan) {
    return <div className="text-red-500">Error: {errorVan}</div>;
  }

  const discount = parseFloat(deal?.discount) || 0;
  const originalPrice = parseFloat(van?.price) || 0;
  const discountedPrice = (originalPrice * (1 - discount / 100)).toFixed(2);

  const specs = [
    `Seats: ${van?.seats || 0}`,
    `Beds: ${van?.beds || 0}`,
    `Transmission: ${van?.transmission || "N/A"}`,
  ];

  

  return (
    <div className="w-72 rounded-xl shadow-md p-4  border bg-white/80
                backdrop-blur-md transition-all duration-200">
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {van.manufacturer} {van.model}
        </h3>

        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {van.type}
        </h3> 

        <div className="flex items-center text-sm text-gray-600 mb-2">
          <MapPinIcon className="w-5 h-5 mr-1 text-gray-500" />
          {van.location}
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
            {discountedPrice > 0 && (
              <span className="text-sm line-through text-gray-400">€{originalPrice.toFixed(2)}</span>
            )}
          </div>
          <span className="text-xs text-gray-500">/ day</span>
        </div>

        <div className="mt-auto flex space-x-2">
          <Button className="flex-1 text-center py-2 border border-green-600 text-green-600 rounded hover:bg-green-50 transition">
            More info
          </Button>
          <Button
          color="success"
          variant='bordered'
          onPress={handleBookingClick}
          className="flex-1 text-center py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
            Book now
          </Button>
        </div>
      </div>
    </div>
  );
}

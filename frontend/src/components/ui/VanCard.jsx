import React from "react";
import dayjs from "dayjs";
import {
  CalendarIcon,
  MapPinIcon,
  CurrencyDollarIcon, // Replacing CashIcon with CurrencyDollarIcon
  TruckIcon, // Replacing CarIcon with TruckIcon (or you can search for a different vehicle-related icon)
} from "@heroicons/react/24/outline";

const VanCard = ({ van }) => {
  // Format the base rate as currency (or any other relevant field as a date if applicable)
  const formattedPrice = `$${van.price.toLocaleString()}`;
  const formattedBaseRate = `$${van.baseRate.toLocaleString()}`;

  return (
    <div className="w-full max-w-[95vw] sm:max-w-[85vw] md:max-w-[70vw] lg:max-w-[50vw] xl:max-w-[40vw] 2xl:max-w-[35vw] rounded-3xl shadow-card p-6 sm:p-8 md:p-10 xl:p-12 bg-voga-card border border-voga-border transition-all duration-300">
      <div className="space-y-6 sm:space-y-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-voga-title">
          {van.manufacturer} {van.model}
        </h2>

        <div className="flex items-center text-base md:text-lg text-voga-textMuted">
          <TruckIcon className="w-6 h-6 mr-2 text-voga-accent" />
          {van.type} Van
        </div>

        <div className="flex items-center text-base md:text-lg text-voga-textMuted">
          <CurrencyDollarIcon className="w-6 h-6 mr-2 text-voga-accent" />
          {formattedPrice} / day
        </div>

        <div className="flex items-center text-base md:text-lg text-voga-textMuted">
          <CalendarIcon className="w-6 h-6 mr-2 text-voga-accent" />
          Base Rate: {formattedBaseRate} / day
        </div>

        <div>
          <h3 className="text-xl md:text-2xl font-semibold text-voga-text mb-3">
            Location
          </h3>
          <div className="flex items-center text-voga-title">
            <MapPinIcon className="w-6 h-6 mr-2 text-voga-accent" />
            {van.location}
          </div>
        </div>

        <div>
          <h3 className="text-xl md:text-2xl font-semibold text-voga-text mb-3">
            Van Details
          </h3>
          <ul className="space-y-4">
            <li className="text-voga-title">
              <strong>Seats:</strong> {van.seats}
            </li>
            <li className="text-voga-title">
              <strong>Beds:</strong> {van.beds}
            </li>
            <li className="text-voga-title">
              <strong>Transmission:</strong> {van.transmission}
            </li>
            <li className="text-voga-title">
              <strong>Weight:</strong> {van.weight} kg
            </li>
            <li className="text-voga-title">
              <strong>Dimensions:</strong> {van.dimension.join(" x ")} meters
            </li>
          </ul>
        </div>

        {van.info && (
          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-voga-text mb-3">
              Van Info
            </h3>
            <p className="text-base md:text-lg text-voga-text">{van.info}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VanCard;

import React from "react";
import {CalendarIcon, MapPinIcon, CurrencyDollarIcon, TruckIcon, UserIcon, CubeIcon, InformationCircleIcon, StarIcon} from "@heroicons/react/24/outline";
import Button from "@/components/ui/Buttons";
import Title from "@/components/ui/Titles";

// VanCardDetailed component to display detailed information about a van and its reviews
const VanCardDetailed = ({ van, onBookNow }) => {
  const formattedPrice = `$${van.price?.toLocaleString()}`;
  const formattedBaseRate = `$${van.baseRate?.toLocaleString()}`;
  const dimensions = Array.isArray(van.dimension) ? van.dimension.join(" × ") + " m" : "";

  // Van details card with info and button
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Van Details Card */}
      <div className="rounded-xl shadow-md p-6 bg-voga-card border border-voga-border">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <Title className="text-3xl">
              {van.manufacturer} {van.model}
            </Title>
            <div className="flex items-center gap-2">
              <TruckIcon className="w-6 h-6 text-voga-accent" />
              <span className="text-lg text-voga-textMuted">{van.type}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-center">
              <CurrencyDollarIcon className="w-6 h-6 mr-2 text-voga-accent" />
              <div>
                <p className="text-sm text-voga-textMuted">Price per day</p>
                <p className="text-lg font-semibold text-voga-title">{formattedPrice}</p>
              </div>
            </div>

            <div className="flex items-center">
              <CalendarIcon className="w-6 h-6 mr-2 text-voga-accent" />
              <div>
                <p className="text-sm text-voga-textMuted">Base Rate</p>
                <p className="text-lg font-semibold text-voga-title">{formattedBaseRate}</p>
              </div>
            </div>

            <div className="flex items-center">
              <UserIcon className="w-6 h-6 mr-2 text-voga-accent" />
              <div>
                <p className="text-sm text-voga-textMuted">Capacity</p>
                <p className="text-lg font-semibold text-voga-title">
                  {van.seats} seats, {van.beds} beds
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <CubeIcon className="w-6 h-6 mr-2 text-voga-accent" />
              <div>
                <p className="text-sm text-voga-textMuted">Dimensions</p>
                <p className="text-lg font-semibold text-voga-title">{dimensions}</p>
              </div>
            </div>

            <div className="flex items-center">
              <MapPinIcon className="w-6 h-6 mr-2 text-voga-accent" />
              <div>
                <p className="text-sm text-voga-textMuted">Location</p>
                <p className="text-lg font-semibold text-voga-title">{van.location}</p>
              </div>
            </div>

            <div className="flex items-center">
              <InformationCircleIcon className="w-6 h-6 mr-2 text-voga-accent" />
              <div>
                <p className="text-sm text-voga-textMuted">Color</p>
                <p className="text-lg font-semibold text-voga-title">{van.color}</p>
              </div>
            </div>
          </div>

          {van.info && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-voga-text mb-2">Description</h3>
              <p className="text-voga-title">{van.info}</p>
            </div>
          )}

          <div className="pt-4 text-center">
            <Button variant="primary" onClick={onBookNow} className="text-lg px-8 py-3" >
              Book this Van
            </Button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default VanCardDetailed;
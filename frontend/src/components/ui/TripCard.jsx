/*

Small UI for the Trips
Author: ODIN Thomas

*/
import React from "react";
import dayjs from "dayjs";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  PencilIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

const TripCard = ({ trip }) => {
  const formattedStart = dayjs(trip.start_date).format("MMMM D, YYYY");
  const formattedEnd = dayjs(trip.end_date).format("MMMM D, YYYY");
  const tripDuration =
    dayjs(trip.end_date).diff(dayjs(trip.start_date), "day") + 1;

  return (
    <div className="h-full w-full max-w-[95vw] sm:max-w-[85vw] md:max-w-[70vw] lg:max-w-[50vw] xl:max-w-[40vw] 2xl:max-w-[35vw] rounded-3xl shadow-card p-6 sm:p-8 md:p-10 xl:p-12 bg-voga-card border border-voga-border transition-all duration-300">
      <div className="space-y-6 sm:space-y-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-voga-title text-center">
          {trip.title}
        </h2>

        <div className="flex items-center text-base md:text-lg text-voga-textMuted">
          <CalendarIcon className="w-6 h-6 mr-2 text-voga-accent" />
          {formattedStart} – {formattedEnd}
        </div>

        <div className="flex items-center text-base md:text-lg text-voga-textMuted">
          <ClockIcon className="w-6 h-6 mr-2 text-voga-accent" />
          {tripDuration} day trip
        </div>

        <div className="flex items-center text-base md:text-lg text-voga-textMuted">
          <TruckIcon className="w-6 h-6 mr-2 text-voga-accent" />
          Van {trip.van_booked ? "booked" : "not booked"}
        </div>
      </div>
    </div>
  );
};

export default TripCard;

import React from "react";
import dayjs from "dayjs";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";

const GuideCard = ({ guide }) => {
  const formattedDate = dayjs(guide.creation_date).format("MMMM D, YYYY");

  return (
    <div className="w-full max-w-[95vw] sm:max-w-[85vw] md:max-w-[70vw] lg:max-w-[50vw] xl:max-w-[40vw] 2xl:max-w-[35vw] rounded-3xl shadow-card p-6 sm:p-8 md:p-10 xl:p-12 bg-voga-card border border-voga-border transition-all duration-300">
      <div className="space-y-6 sm:space-y-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-voga-title">
          {guide.title}
        </h2>

        <div className="flex items-center text-base md:text-lg text-voga-textMuted">
          <CalendarIcon className="w-6 h-6 mr-2 text-voga-accent" />
          {formattedDate}
        </div>

        <div className="flex items-center text-base md:text-lg text-voga-textMuted">
          <ClockIcon className="w-6 h-6 mr-2 text-voga-accent" />
          {guide.duration} min tour
        </div>

        <div>
          <h3 className="text-xl md:text-2xl font-semibold text-voga-text mb-3">
            Locations
          </h3>
          <ul className="space-y-4">
            {guide.locations.map((loc, index) => (
              <li key={index} className="text-voga-title">
                <div className="flex items-center">
                  <MapPinIcon className="w-6 h-6 mr-2 text-voga-accent" />
                  <span className="font-medium">{loc.name}</span>
                  <span className="ml-2 text-sm text-voga-textMuted">
                    ({loc.section})
                  </span>
                </div>
                {loc.info && (
                  <p className="ml-8 text-sm md:text-base text-voga-text italic">
                    {loc.info}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>

        {guide.notes.length > 0 && (
          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-voga-text mb-3 flex items-center">
              <PencilIcon className="w-6 h-6 mr-2 text-voga-accent" />
              Notes
            </h3>
            <ul className="list-disc pl-6 sm:pl-8 text-base md:text-lg text-voga-title space-y-2">
              {guide.notes.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuideCard;

import React from "react";
import dayjs from "dayjs";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";

const GuideDetailCard = ({ guide }) => {
  const formattedDate = dayjs(guide.creation_date).format("MMMM D, YYYY");

  // Group locations by section
  const sectionMap = guide.locations.reduce((acc, loc) => {
    if (!acc[loc.section]) acc[loc.section] = [];
    acc[loc.section].push(loc);
    return acc;
  }, {});

  return (
    <div className="w-full max-w-[1600px] mx-auto rounded-3xl shadow-card p-10 xl:p-14 bg-voga-card border border-voga-border transition-all duration-300 space-y-10">
      <div className="space-y-6">
        <h1 className="text-4xl xl:text-5xl font-bold text-voga-title text-center">
          {guide.title}
        </h1>

        <div className="flex flex-wrap justify-center items-center gap-6 text-lg xl:text-xl text-voga-textMuted">
          <div className="flex items-center">
            <CalendarIcon className="w-6 h-6 mr-2 text-voga-accent" />
            {formattedDate}
          </div>
          <div className="flex items-center">
            <ClockIcon className="w-6 h-6 mr-2 text-voga-accent" />
            {guide.duration} min tour
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-semibold text-voga-text mb-4 flex items-center">
          <MapPinIcon className="w-7 h-7 mr-3 text-voga-accent" />
          Locations
        </h2>
        <hr className="border-t-2 border-voga-border mb-6" />
        <div className="space-y-8">
          {Object.entries(sectionMap).map(([section, locations]) => (
            <div key={section} className="space-y-4">
              <h3 className="text-2xl text-voga-title font-semibold">
                {section}
              </h3>
              <ul className="ml-4 space-y-4 pl-4 border-l-4 border-voga-accent">
                {locations.map((loc, idx) => (
                  <li key={idx} className="ml-0">
                    <div className="flex items-center mb-1">
                      <span className="font-medium text-lg">{loc.name}</span>
                    </div>
                    {loc.info && (
                      <p className="text-sm text-voga-text italic">
                        {loc.info}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {guide.notes.length > 0 && (
        <div>
          <h2 className="text-3xl font-semibold text-voga-text mb-4 flex items-center mt-10">
            <PencilIcon className="w-7 h-7 mr-3 text-voga-accent" />
            Notes
          </h2>
          <hr className="border-t-2 border-voga-border mb-6" />
          <ul className="list-disc pl-10 text-lg xl:text-xl text-voga-title space-y-2">
            {guide.notes.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GuideDetailCard;

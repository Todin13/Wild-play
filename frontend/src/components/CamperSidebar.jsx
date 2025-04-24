import React from "react";
import Title from "@/components/ui/Titles";
import Button from "@/components/ui/Buttons";
import DateRangeFilter from "@/components/ui/DateRangeFilter";

const CamperSidebar = ({ filters, onChange, onSearch, onReset }) => {
  return (
    <div className="bg-intro-card/70 backdrop-blur-md border border-gray-200 rounded-2xl shadow-2xl p-6 lg:p-8 space-y-6">
      <div>
        <Title variant="section" className="text-center">
          Filter Campers
        </Title>

        <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Date Range</label>
            <DateRangeFilter
                onApply={({ startDate, endDate }) => {
                onChange({ target: { name: "startDate", value: startDate } });
                onChange({ target: { name: "endDate", value: endDate } });
                }}
            />
        </div>

        </div>

        <div className="flex flex-col gap-4 xl:flex-row xl:justify-between">
          <div className="flex justify-center w-full xl:w-auto gap-4">
            <Button variant="primary" onClick={onSearch}>
              Search
            </Button>
            <Button
              variant="primary"
              onClick={onReset}
              className="hover:bg-blue-600"
            >
              Reset Filters
            </Button>
          </div>
      </div>
    </div>
  );
};

export default CamperSidebar;

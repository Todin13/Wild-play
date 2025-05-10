import React from "react";
import Title from "@/components/ui/Titles";
import Button from "@/components/ui/Buttons";
import DateRangeFilter from "@/components/ui/DateRangeFilter";
import { Select, SelectItem } from "@heroui/react";
import { useVanFilters } from "@/hooks/VanHooks";

const CamperSidebar = ({ filters, onChange, onSearch, onReset }) => {
  const { manufacturers, types, loading } = useVanFilters();

  const handleSelectChange = (name) => (key) => {
    const value = Array.from(key)[0]; // from Set to string
    onChange(name, value);
  };

  return (
    <div className="bg-intro-card/70 backdrop-blur-md border border-gray-200 rounded-2xl shadow-2xl p-6 lg:p-8 space-y-6">
      <div>
        <Title variant="section" className="text-center">
          Filter Campers
        </Title>

        <div className="space-y-4">
          <DateRangeFilter
            startDate={filters.startDate} // Pass startDate
            endDate={filters.endDate} // Pass endDate
            onApply={({ startDate, endDate }) => {
              onChange("startDate", startDate);
              onChange("endDate", endDate);
            }}
          />

          <Select
            label="Manufacturer"
            selectedKeys={[filters.manufacturer]}
            isDisabled={loading}
            onSelectionChange={handleSelectChange("manufacturer")}
          >
            <SelectItem key="">All</SelectItem>
            {manufacturers.map((mfr) => (
              <SelectItem key={mfr}>{mfr}</SelectItem>
            ))}
          </Select>

          <Select
            label="Transmission"
            selectedKeys={[filters.transmission]}
            onSelectionChange={handleSelectChange("transmission")}
          >
            <SelectItem key="">All</SelectItem>
            <SelectItem key="Manual">Manual</SelectItem>
            <SelectItem key="Automatic">Automatic</SelectItem>
          </Select>

          <Select
            label="Type"
            selectedKeys={[filters.type]}
            isDisabled={loading}
            onSelectionChange={handleSelectChange("type")}
          >
            <SelectItem key="">All</SelectItem>
            {types.map((type) => (
              <SelectItem key={type}>{type}</SelectItem>
            ))}
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-4 xl:flex-row xl:justify-between">
        <div className="flex justify-center w-full xl:w-auto gap-4">
          <Button variant="primary" onClick={onSearch}>
            Search
          </Button>
          <Button variant="primary" onClick={onReset}>
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CamperSidebar;

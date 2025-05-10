import { useState } from "react";
import { format } from "date-fns";

export default function DateRangeFilter({ onApply }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const today = format(new Date(), "yyyy-MM-dd");

  const handleApply = () => {
    if (startDate && endDate && endDate > startDate) {
      onApply({ startDate, endDate });
    } else {
      onApply({ startDate: "", endDate: "" });
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-bold">Filter by Dates</h2>

      <div className="space-y-2">
        <input
          type="date"
          className="w-full p-2 border rounded-md shadow"
          min={today}
          value={startDate}
          onChange={(e) => {
            setStartDate(e.target.value);
            if (endDate && e.target.value >= endDate) {
              setEndDate("");
            }
          }}
        />
        <input
          type="date"
          className="w-full p-2 border rounded-md shadow"
          min={
            startDate
              ? format(new Date(new Date(startDate).setDate(new Date(startDate).getDate() + 1)), "yyyy-MM-dd")
              : today
          }
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          disabled={!startDate}
        />
      </div>

      <button
        onClick={handleApply}
        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
      >
        Apply Filter
      </button>
    </div>
  );
}

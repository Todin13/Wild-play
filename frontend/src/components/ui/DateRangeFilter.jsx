/*

Date filter for the van search filter
Author: HERVET Thibaut

*/
import { useState, useEffect } from "react";
import { format } from "date-fns";

export default function DateRangeFilter({
  startDate: initialStartDate,
  endDate: initialEndDate,
  onApply,
}) {
  const [startDate, setStartDate] = useState(initialStartDate || "");
  const [endDate, setEndDate] = useState(initialEndDate || "");
  const today = format(new Date(), "yyyy-MM-dd");

  // If the passed startDate or endDate changes, update the component state
  useEffect(() => {
    if (initialStartDate) setStartDate(initialStartDate);
    if (initialEndDate) setEndDate(initialEndDate);
  }, [initialStartDate, initialEndDate]);

  const handleApply = () => {
    // If both startDate and endDate are valid, apply the filter
    if (startDate && endDate && endDate > startDate) {
      onApply({ startDate, endDate });
    } else {
      // If not, reset both startDate and endDate to empty
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
              setEndDate(""); // Reset endDate if startDate is changed and invalidates it
            }
          }}
        />
        <input
          type="date"
          className="w-full p-2 border rounded-md shadow"
          min={
            startDate
              ? format(
                  new Date(
                    new Date(startDate).setDate(
                      new Date(startDate).getDate() + 1
                    )
                  ),
                  "yyyy-MM-dd"
                )
              : today
          }
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          disabled={!startDate} // Disable end date until a start date is selected
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

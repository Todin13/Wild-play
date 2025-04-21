import React, { useState } from "react";
import Button from "@/components/ui/Buttons"; // Import your Button component
import { useCreateTripFromGuide } from "@/hooks/TripHooks"; // Import the hook for creating a trip from guide
import useNavigationHooks from "@/hooks/NavigationHooks"; // Import the navigation hook

const CreateTripFromGuideButton = ({ guideId }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State for showing modal
  const { createFromGuide, createFromGuideLoading, createFromGuideError } =
    useCreateTripFromGuide();
  const { goToTripDetail } = useNavigationHooks(); // Use the custom navigation hook

  // Function to validate dates
  const validateDates = () => {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Check if start date is later than today
    if (start <= today) {
      alert("Start date must be later than today.");
      return false;
    }

    // Check if end date is later than start date
    if (end <= start) {
      alert("End date must be later than start date.");
      return false;
    }

    return true;
  };

  const handleCreateTrip = async () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    if (!validateDates()) {
      return; // Don't proceed if validation fails
    }

    try {
      // Call the API function to create a trip from the guide
      const response = await createFromGuide(guideId, startDate, endDate);
      const createdTrip = response?.trip;

      if (createdTrip) {
        alert("Trip created successfully!");
        goToTripDetail(createdTrip); // Navigate to the Trip Detail Page with the created trip
        setIsModalOpen(false); // Close the modal
      } else {
        alert("Trip creation succeeded but no trip data was returned.");
      }
    } catch (error) {
      alert(
        createFromGuideError?.message ||
          error?.message ||
          "Something went wrong while creating the trip."
      );
    }
  };

  return (
    <div>
      {/* Button to trigger modal */}
      <Button
        variant="primary"
        onClick={() => setIsModalOpen(true)}
        className="text-3xl py-6 px-10 font-semibold"
      >
        {createFromGuideLoading ? "Creating..." : "Create Trip from Guide"}
      </Button>

      {/* Modal to input dates */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Select Trip Dates</h3>

            {/* Label and Input for Start Date */}
            <div className="mb-4">
              <label
                htmlFor="start-date"
                className="block text-gray-700 font-semibold mb-2"
              >
                Start Date
              </label>
              <input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="p-2 border rounded-md w-full"
                placeholder="Start Date"
                min={new Date().toISOString().split("T")[0]} // Disable past dates
              />
            </div>

            {/* Label and Input for End Date */}
            <div className="mb-4">
              <label
                htmlFor="end-date"
                className="block text-gray-700 font-semibold mb-2"
              >
                End Date
              </label>
              <input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="p-2 border rounded-md w-full"
                placeholder="End Date"
                min={startDate} // Disable dates before start date
              />
            </div>

            {/* Modal buttons */}
            <div className="flex justify-between">
              <Button
                variant="secondary"
                onClick={() => setIsModalOpen(false)}
                className="py-2 px-4"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleCreateTrip}
                disabled={createFromGuideLoading}
                className="py-2 px-4"
              >
                {createFromGuideLoading ? "Creating..." : "Create Trip"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateTripFromGuideButton;

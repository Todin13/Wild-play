import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import API from "@/utils/api";
import MainLayout from "@/layouts/MainLayout";
import Title from "@/components/ui/Titles";
import Button from "@/components/ui/Buttons";
import VanCard from "@/components/ui/VanCard";
import "@/assets/styles/index.css";

// BookingsCampers component to display available campers for booking
const BookingsCampers = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [campers, setCampers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const today = format(new Date(), "yyyy-MM-dd");

  // Fetch available campers based on selected dates
  const fetchAvailableCampers = useCallback(async () => {
    if (startDate && endDate && endDate > startDate) {
      try {
        const { data } = await API.get("/bookings/available_campers", {
          params: {
            start_date: startDate,
            end_date: endDate,
          },
        });

        setCampers(data.availableCampers || []);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Failed to load available campers.");
        setCampers([]);
      }
    } else {
      setCampers([]);
    }
  }, [startDate, endDate]);

  // Fetch available campers when the component mounts or when dates change
  useEffect(() => {
    fetchAvailableCampers();
  }, [fetchAvailableCampers]);

  //render the component
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto mt-10 px-4">
        <Title variant="page" className="mb-6">Choose Booking Dates</Title>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <input
            type="date"
            className="p-3 border rounded-md shadow"
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
            className="p-3 border rounded-md shadow"
            min={
              startDate
                ? format(
                    new Date(new Date(startDate).setDate(new Date(startDate).getDate() + 1)),
                    "yyyy-MM-dd"
                  )
                : today
            }
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            disabled={!startDate}
          />
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {campers.length > 0 ? (
            campers.map((camper) => (
              <div 
                key={camper._id}
                onClick={() =>
                  navigate(`/bookings/campers/details/${camper._id}`, {
                    state: { van: camper, startDate, endDate },
                  })
                }
                className="cursor-pointer"
              >
                <VanCard van={camper} />
              </div>
            ))
          ) : (
            startDate && endDate && <p className="text-center col-span-full">No campers available for selected dates.</p>
          )}
        </div>

        {campers.length > 0 && (
          <div className="mt-8 text-center">
            <Button variant="primary" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} >
              Back to Top
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default BookingsCampers;
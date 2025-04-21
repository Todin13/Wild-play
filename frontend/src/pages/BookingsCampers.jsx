import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import MainLayout from "@/layouts/MainLayout";
import "@/assets/styles/index.css";

const BookingsCampers = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [campers, setCampers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const today = format(new Date(), "yyyy-MM-dd");

  useEffect(() => {
    const fetchAvailableCampers = async () => {
      if (startDate && endDate && endDate > startDate) {
        try {
          const response = await fetch(
            `https://wild-play-api.vercel.app/api/bookings/available_campers?start_date=${startDate}&end_date=${endDate}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch available campers.");
          }

          const data = await response.json();
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
    };

    fetchAvailableCampers();
  }, [startDate, endDate]);

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto mt-10 px-4">
        <h1 className="text-2xl font-bold mb-6 text-center">Choose Booking Dates</h1>

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
            min={startDate ? format(new Date(new Date(startDate).setDate(new Date(startDate).getDate() + 1)), "yyyy-MM-dd") : today}
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
                onClick={() => navigate(`/bookings/campers/details/${camper._id}`, {
                  state: { van: camper, startDate, endDate }
                })}
                className="bg-[#dcf2eb] cursor-pointer shadow-md rounded-2xl p-4 hover:bg-[#bde0d1] transition"
              >
                <h2 className="text-lg font-bold text-gray-800 mb-2 text-center">
                  {camper.color} {camper.manufacturer} {camper.model}
                </h2>
                <p className="text-sm text-gray-700 mb-1">Price: <strong>{camper.price} €</strong></p>
                <p className="text-sm text-gray-700 mb-1">Seats: <strong>{camper.seats}</strong></p>
                <p className="text-sm text-gray-700 mb-1">Beds: <strong>{camper.beds}</strong></p>
                <p className="text-sm text-gray-700">Transmission: <strong>{camper.transmission}</strong></p>
              </div>
            ))
          ) : (
            startDate && endDate && (
              <p className="text-center col-span-full">No campers available for selected dates.</p>
            )
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default BookingsCampers;

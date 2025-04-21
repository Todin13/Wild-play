import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import "@/assets/styles/index.css";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import API from "@/utils/api";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await API.get("/bookings/all");
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <MainLayout>
      <section className="relative m-8 p-4 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {loading ? (
          <div className="text-center text-lg col-span-full">Loading...</div>
        ) : bookings.length === 0 ? (
          <div className="text-center text-lg col-span-full">
            No bookings found.
          </div>
        ) : (
          bookings.map((booking) => (
            <Link
              key={booking._id}
              to={`/bookings/${booking._id}`}
              className="bg-[#dcf2eb] text-center shadow-md rounded-2xl p-4 flex flex-col h-full hover:bg-[#bde0d1]"
            >
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  {booking?.van_id?.color} {booking?.van_id?.manufacturer}{" "}
                  {booking?.van_id?.model}
                </h2>
                <div className="text-gray-500 flex items-center justify-end gap-1">
                  <CalendarDaysIcon className="h-5 w-5 text-gray-500" />
                  <span className="font-bold text-gray-600">
                    {new Date(booking?.start_date).toLocaleDateString()}
                  </span>
                  <span>to</span>
                  <span className="font-bold text-gray-600">
                    {new Date(booking?.end_date).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                {booking?.pick_up_location && (
                  <p className="text-gray-500">
                    Pickup location:{" "}
                    <span className="font-bold text-gray-600">
                      {booking?.pick_up_location}
                    </span>
                  </p>
                )}
                {booking?.delivery_location && (
                  <p className="text-gray-500">
                    Delivery location:{" "}
                    <span className="font-bold text-gray-600">
                      {booking?.delivery_location}
                    </span>
                  </p>
                )}
                {booking?.return_location && (
                  <p className="text-gray-500">
                    Return location:{" "}
                    <span className="font-bold text-gray-600">
                      {booking?.return_location}
                    </span>
                  </p>
                )}
                {booking?.promocode && (
                  <p className="text-gray-500">
                    Promocode:{" "}
                    <span className="font-bold text-gray-600">
                      {booking?.promocode}
                    </span>
                  </p>
                )}
                {booking?.amount && (
                  <p className="text-gray-500">
                    Amount:{" "}
                    <span className="font-bold text-gray-600">
                      {booking?.amount}
                    </span>
                  </p>
                )}
              </div>

              <div className="flex justify-between mt-auto">
                <div
                  className={`inline-block px-4 py-2 rounded-full font-bold text-white ${
                    booking?.status === "PENDING"
                      ? "bg-gray-400"
                      : booking?.status === "CONFIRMED"
                      ? "bg-green-400"
                      : booking?.status === "CANCELLED"
                      ? "bg-red-400"
                      : "bg-gray-400"
                  }`}
                >
                  {booking?.status}
                </div>

                <div
                  className={`inline-block px-4 py-2 rounded-full font-bold text-white 
                    ${booking?.paid ? "bg-green-400" : "bg-red-400"}`}
                >
                  {booking?.paid ? "Paid" : "Not paid"}
                </div>
              </div>
            </Link>
          ))
        )}
      </section>
    </MainLayout>
  );
};

export default Bookings;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import "@/assets/styles/index.css";

const BookingDetails = () => {
  const { booking_id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5019/api/bookings/${booking_id}`, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch booking details");
        }

        const data = await response.json();
        setBooking(data);
      } catch (error) {
        console.error("Error fetching booking details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [booking_id]);

  const handleCancelBooking = async () => {
    try {
      const response = await fetch(`http://localhost:5019/api/bookings/${booking_id}/cancel`, {
        method: "PATCH",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to cancel booking");
      }

      const updatedBooking = await response.json();
      setBooking(updatedBooking);
      setShowConfirm(false);
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert("Failed to cancel booking.");
    }
  };

  const formatDate = (dateStr) => dateStr ? new Date(dateStr).toLocaleDateString() : null;

  return (
    <MainLayout>
      <section className="m-8 p-4">
        {loading ? (
          <div className="text-center text-lg">Loading...</div>
        ) : !booking ? (
          <div className="text-center text-lg">Booking not found.</div>
        ) : (
          <div className="bg-[#dcf2eb] shadow-md rounded-2xl p-6 max-w-4xl mx-auto space-y-6 text-left">
            <div className="flex items-center gap-3 flex-wrap mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Booking Details</h2>
              <span
                className={`px-3 py-2 rounded-full text-white text-sm font-bold ${
                  booking?.status === "PENDING"
                    ? "bg-gray-400"
                    : booking?.status === "CONFIRMED"
                    ? "bg-green-400"
                    : "bg-red-400"
                }`}
              >
                {booking.status}
              </span>
              <span
                className={`px-3 py-2 rounded-full text-white text-sm font-bold ${
                  booking?.paid ? "bg-green-400" : "bg-red-400"
                }`}
              >
                {booking.paid ? "Paid" : "Not paid"}
              </span>
            </div>

            <div className="space-y-4">
              {booking?.start_date && (
                <p><span className="font-semibold text-gray-700">Start Date:</span>{" "}{formatDate(booking.start_date)}</p>
              )}
              {booking?.end_date && (
                <p><span className="font-semibold text-gray-700">End Date:</span>{" "}{formatDate(booking.end_date)}</p>
              )}
              {booking?.pick_up_location && (
                <p><span className="font-semibold text-gray-700">Pickup Location:</span>{" "}{booking.pick_up_location}</p>
              )}
              {booking?.return_location && (
                <p><span className="font-semibold text-gray-700">Return Location:</span>{" "}{booking.return_location}</p>
              )}
              {booking?.delivery_location && (
                <p><span className="font-semibold text-gray-700">Delivery Location:</span>{" "}{booking.delivery_location}</p>
              )}
              {booking?.promocode && (
                <p><span className="font-semibold text-gray-700">Promocode:</span> {booking.promocode}</p>
              )}
              {booking?.amount != null && (
                <p><span className="font-semibold text-gray-700">Amount:</span> ${booking.amount}</p>
              )}
            </div>

            <hr className="my-4 border-t-4 border-white rounded-lg" />

            <h2 className="text-2xl font-bold text-gray-800 mb-2">Van Information</h2>
            <div className="space-y-4">
              {booking?.van_id?.type && (
                <p><span className="font-semibold text-gray-700">Type:</span> {booking.van_id.type}</p>
              )}
              {booking?.van_id?.manufacturer && (
                <p><span className="font-semibold text-gray-700">Manufacturer:</span>{" "}{booking.van_id.manufacturer}</p>
              )}
              {booking?.van_id?.model && (
                <p><span className="font-semibold text-gray-700">Model:</span> {booking.van_id.model}</p>
              )}
              {booking?.van_id?.color && (
                <p><span className="font-semibold text-gray-700">Color:</span> {booking.van_id.color}</p>
              )}
              {booking?.van_id?.price != null && (
                <p><span className="font-semibold text-gray-700">Price:</span> ${booking.van_id.price}</p>
              )}
              {booking?.van_id?.baseRate != null && (
                <p><span className="font-semibold text-gray-700">Base Rate:</span> ${booking.van_id.baseRate}</p>
              )}
              {booking?.van_id?.seats != null && (
                <p><span className="font-semibold text-gray-700">Seats:</span> {booking.van_id.seats}</p>
              )}
              {booking?.van_id?.beds != null && (
                <p><span className="font-semibold text-gray-700">Beds:</span> {booking.van_id.beds}</p>
              )}
              {booking?.van_id?.fuel && (
                <p><span className="font-semibold text-gray-700">Fuel:</span> {booking.van_id.fuel}</p>
              )}
              {booking?.van_id?.weight != null && (
                <p><span className="font-semibold text-gray-700">Weight:</span> {booking.van_id.weight} kg</p>
              )}
              {Array.isArray(booking?.van_id?.dimension) && booking.van_id.dimension.length > 0 && (
                <p><span className="font-semibold text-gray-700">Dimensions:</span>{" "}{booking.van_id.dimension.join("m x ")}m</p>
              )}
              {booking?.van_id?.location && (
                <p><span className="font-semibold text-gray-700">Location:</span>{" "}{booking.van_id.location}</p>
              )}
              {booking?.van_id?.info && (
                <p><span className="font-semibold text-gray-700">Info:</span> {booking.van_id.info}</p>
              )}
              {booking?.van_id?.utilities && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-gray-700 mr-2">Utilities:</span>
                  {(Array.isArray(booking.van_id.utilities)
                    ? booking.van_id.utilities
                    : Object.entries(booking.van_id.utilities[0])
                        .filter(([_, value]) => value)
                        .map(([key]) => key)
                  ).map((utility, index) => (
                    <div key={index} className="bg-green-700 text-white font-bold text-sm px-3 py-1 rounded-full shadow-sm">
                      {utility}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <hr className="my-4 border-t-4 border-white rounded-lg" />
            
            {booking.status !== "CANCELLED" && (
              <div className="">
                <button onClick={() => setShowConfirm(true)} className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-xl transition" >
                  Cancel Booking
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl text-center space-y-4 max-w-sm w-full">
            <h3 className="text-lg font-bold text-gray-800">
              Are you sure you want to cancel the booking?
            </h3>
            <div className="flex justify-center gap-4">
              <button onClick={handleCancelBooking} className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-xl">
                Yes
              </button>
              <button onClick={() => setShowConfirm(false)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-4 py-2 rounded-xl">
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default BookingDetails;

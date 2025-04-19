import { useEffect, useState } from "react";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("http://localhost:5019/api/bookings/all", {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }

        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <div className="text-center text-lg">Loading...</div>;

  return (
    <div className="p-4 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {bookings.length === 0 ? (
        <div className="text-center text-lg">No bookings found.</div>
      ) : (
        bookings.map((booking) => (
          <div key={booking._id} className="bg-white shadow-md rounded-2xl p-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {booking?.van_id?.manufacturer} {booking?.van_id?.model}
            </h2>
            <p className="text-gray-600">
              Color: <span className="font-medium">{booking?.van_id?.color}</span>
            </p>
            <p className="text-gray-600">
              Start Date: <span className="font-medium">{new Date(booking?.start_date).toLocaleDateString()}</span>
            </p>
            <p className="text-gray-600">
              End Date: <span className="font-medium">{new Date(booking?.end_date).toLocaleDateString()}</span>
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default Bookings;

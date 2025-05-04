import { useEffect, useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import BookingsComponent from "@/components/ui/BookingsComponent";
import API from "@/utils/api";
import "@/assets/styles/index.css";

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
      <section className="m-8 p-4">
        <BookingsComponent bookings={bookings} loading={loading} />
      </section>
    </MainLayout>
  );
};

export default Bookings;
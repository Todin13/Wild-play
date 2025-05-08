/*

Bookings Page
Author: Kirill Smirnov

*/

import { useEffect, useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import BookingsComponent from "@/components/ui/BookingsComponent";
import API from "@/utils/api";
import "@/assets/styles/index.css";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await API.get("/bookings/all"); //endpoint call to fetch all bookings
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Render the component
  return (
    <MainLayout>
      <section className="m-8 p-4">
        <BookingsComponent bookings={bookings} loading={loading} />
      </section>
    </MainLayout>
  );
};

export default Bookings;
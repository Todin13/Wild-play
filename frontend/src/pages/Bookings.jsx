/*

Bookings Page
Author: Kirill Smirnov

*/

import { useEffect, useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import BookingsComponent from "@/components/ui/BookingsComponent";
import API from "@/utils/api";
import "@/assets/styles/index.css";
import MountainSVG from "@/assets/images/mountain-svg";

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
      <div className="fixed bottom-0 left-0 w-full z-[-1] pointer-events-none transform xl:translate-y-[30%]">
        <MountainSVG className="w-full h-auto object-cover text-mountain-deepgreen" />
      </div>
      <section className="m-8 p-4">
        <BookingsComponent bookings={bookings} loading={loading} />
      </section>
    </MainLayout>
  );
};

export default Bookings;
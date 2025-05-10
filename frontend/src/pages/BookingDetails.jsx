/*

Booking details page
Author: Kirill Smirnov

*/

import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import MainLayout from "@/layouts/MainLayout";
import BookingDetailsComponent from "@/components/ui/BookingDetailsComponent";
import API from "@/utils/api";
import "@/assets/styles/index.css";
import MountainSVG from "@/assets/images/mountain-svg";

const BookingDetails = () => {
  const { booking_id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);

  const stripePubKey = import.meta.env.VITE_STRIPE_PUB; //payment system public key
  //console.log("stripe key:", stripePubKey); 
  const stripePromise = loadStripe(stripePubKey);

  //payment handler
  const handlePay = async () => {
    try {     
      const payload = {
        bookingId: booking._id,
        amount: booking.amount,
        van: booking.van_id ? {
          manufacturer: booking.van_id.manufacturer,
          model: booking.van_id.model
        } : null
      };

      console.log("payload:", payload);
      const response = await API.post("/payment/create-session", payload);
      
      if (!response.data?.sessionId) {        
        if (response.data?.url) {
          window.location.href = response.data.url;
          return;
        }
        throw new Error("Payment unavailable - please try again later");
      }

      console.log("Redirecting to Stripe checkout...");
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: response.data.sessionId
      });

      if (error) {
        window.location.href = `https://checkout.stripe.com/pay/${response.data.sessionId}`;
      }

    } catch (error) {
      console.error("error:", {
        message: error.message,
        response: error.response?.data,
      });

      const friendlyError = error.response?.data?.error || error.message || "Payment service unavailable";      
      alert(`Payment failed: ${friendlyError}`);
    }
  };

  //fetching booking details
  const fetchBookingDetails = useCallback(async () => {
    try {
      const response = await API.get(`/bookings/${booking_id}`); //endpoint call to fetch booking details
      setBooking(response.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }, [booking_id]);

  //cancel booking handler
  const handleCancelBooking = async () => {
    try {
      const response = await API.patch(`/bookings/${booking_id}/status`, {new_status: "CANCELLED" }); //endpoint call to cancel booking
      setBooking(response.data);
      setShowConfirm(false);
      setTimeout(() => navigate("/bookings"), 500);
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert("Failed to cancel booking.");
    }
  };

  //fetching booking details when the component mounts
  useEffect(() => {
    fetchBookingDetails();
  }, [fetchBookingDetails]);


  // Render the component
  return (
    <MainLayout>
      <div className="fixed bottom-0 left-0 w-full z-[-1] pointer-events-none transform xl:translate-y-[30%]">
        <MountainSVG className="w-full h-auto object-cover text-mountain-deepgreen" />
      </div>
      <section className="m-8 p-4 max-w-4xl mx-auto">
        {loading ? (
          <div className="text-center text-lg">Loading...</div>
        ) : !booking ? (
          <div className="text-center text-lg">Booking not found.</div>
        ) : (
          <BookingDetailsComponent
            booking={booking}
            onCancelBooking={handleCancelBooking}
            showConfirm={showConfirm}
            setShowConfirm={setShowConfirm}
            onPay={handlePay}
          />
        )}
      </section>
    </MainLayout>
  );
};

export default BookingDetails;
/*

Booking details page
Author: Kirill Smirnov

*/

import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, useSearchParamss } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import MainLayout from "@/layouts/MainLayout";
import BookingDetailsComponent from "@/components/ui/BookingDetailsComponent";
import API from "@/utils/api";
import "@/assets/styles/index.css";

const BookingDetails = () => {
  const { booking_id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [searchParams] = useSearchParams();

  const stripePubKey = import.meta.env.VITE_STRIPE_PUB; //payment system public key
  //console.log("stripe key:", stripePubKey); 
  const stripePromise = loadStripe(stripePubKey);

  //payment handler
  const handlePay = async () => {
    try {
      console.log("Initiating payment........");
      
      const payload = {
        bookingId: booking._id,
        amount: booking.amount,
        van: booking.van_id ? {
          manufacturer: booking.van_id.manufacturer,
          model: booking.van_id.model
        } : null
      };

      console.log("Sending payload:", payload);
      const response = await API.post("/payment/create-session", payload);
      
      if (response.data?.url) {
        //Stripe checkout
        window.location.href = response.data.url;
        return;
      }

      if (response.data?.sessionId) {
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({
          sessionId: response.data.sessionId
        });

        if (error) {
          throw error;
        }
      } else {
        throw new Error("Payment unavailable - please try again later");
      }

    } catch (error) {
      console.error("Payment error:", {
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


  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    const status = window.location.pathname;

    if (status.includes('/payment-success') && sessionId) {
      //successful payment
      const bookingId = searchParams.get('booking_id');
      navigate(`/bookings/${bookingId}`, { state: { paymentSuccess: true } });
    } else if (status.includes('/payment-cancelled')) {
      //cancelled payment
      const bookingId = searchParams.get('booking_id');
      navigate(`/bookings/${bookingId}`, { state: { paymentCancelled: true } });
    }
  }, [navigate, searchParams]);


  // Render the component
  return (
    <MainLayout>      
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
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

  const StripeDebug = () => {
    const [stripeLoaded, setStripeLoaded] = useState(false);

    useEffect(() => {
      const checkStripe = async () => {
        try {
          await new Promise((resolve) => {
            if (window.Stripe) return resolve();
            const script = document.createElement('script');
            script.src = 'https://js.stripe.com/v3/';
            script.onload = resolve;
            document.head.appendChild(script);
          });
          setStripeLoaded(true);
        } catch (e) {
          console.error('Stripe.js failed to load', e);
        }
      };
      checkStripe();
    }, []);

    return (
      <div className="debug-info" style={{ fontSize: '12px', color: '#666' }}>
        Stripe Status: {stripeLoaded ? 'Loaded' : 'Loading...'}
        <button onClick={async () => {
          try {
            const stripe = await stripePromise;
            console.log('Stripe instance:', stripe);
            alert('Stripe is properly initialized');
          } catch (e) {
            console.error('Stripe test failed', e);
            alert('Stripe init error: ' + e.message);
          }
        }}>
          Test Stripe Connection
        </button>
      </div>
    );
  };

  //fetching booking details when the component mounts
  useEffect(() => {
    fetchBookingDetails();
  }, [fetchBookingDetails]);



  // Render the component
  return (
    <MainLayout>
      <StripeDebug />
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
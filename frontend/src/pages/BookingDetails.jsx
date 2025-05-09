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

    try {
      await fetch('https://r.stripe.com/b', { method: 'HEAD' });
    } catch {
      throw new Error('Stripe services are being blocked. Please disable ad blockers.');
    }

    console.log("Starting payment process....");
    const stripe = await stripePromise;
    console.log("Stripe initialized");

    const stripeReady = await Promise.race([
      stripePromise,
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Stripe initialization timeout')), 5000)
      )
    ]);

    const payload = {
      bookingId: booking._id,
      amount: booking.amount,
      van: {
        manufacturer: booking.van_id.manufacturer,
        model: booking.van_id.model,
      },
    };
    console.log("Sending payload:", payload);

    const response = await API.post("/payment/create-session", payload);
    console.log("Backend response:", response.data);

    if (!response.data?.sessionId) {
      throw new Error("No sessionId received from backend");
    }

    //fallback
    const { error } = await stripe.redirectToCheckout({
      sessionId: response.data.sessionId
    }).catch(err => {
      // manual redirect
      window.location.href = `https://checkout.stripe.com/pay/${response.data.sessionId}`;
      return { error: null };
    });
    
    if (error) throw error;

  } catch (error) {
    console.error("full payment error:", {
      message: error.message,
      response: error.response?.data,
      stack: error.stack
    });
    
    if (error.message.includes('blocked')) {
      alert('blocked by browser');
    } else if (error.message.includes('timeout')) {
      alert('service is slow');
    } else {
      alert(`failed: ${error.message}`);
    }
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
  //Stripe connect on component mount
  const testStripeConnection = async () => {
    try {
      const stripe = await stripePromise;
      await stripe._apiClient._request('https://r.stripe.com/b', {});
      console.log('Stripe connection successful');
    } catch (error) {
      console.error('Stripe connection failed:', error);
      alert('Stripe is being blocked. Please disable ad blockers or try a different browser.');
    }
  };
  
  testStripeConnection();
}, []);

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
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

  const stripePubKey = import.meta.env.VITE_STRIPE_PUB;
  //console.log("stripe key:", stripePubKey); 
  const stripePromise = loadStripe(stripePubKey);

  const handlePay = async () => {
    try {
      const stripe = await stripePromise;
      const response = await API.post("/payment/create-session", {
        bookingId: booking._id,
        amount: booking.amount,
        van: {
          manufacturer: booking.van_id.manufacturer,
          model: booking.van_id.model,
        },
      });
  
      const { sessionId } = response.data;
      const { error } = await stripe.redirectToCheckout({ sessionId });
      
      if (error) {
        //console.error("Stripe redir:", error);
        alert(error.message);
      }
    } catch (error) {
      //console.error("Payment:", error.response?.data || error.message);
      alert(`Payment failed, Try again later.`);
    }
  };

  const fetchBookingDetails = useCallback(async () => {
    try {
      const response = await API.get(`/bookings/${booking_id}`);
      setBooking(response.data);
    } catch (error) {
      console.error("Error fetching booking details:", error);
    } finally {
      setLoading(false);
    }
  }, [booking_id]);

  const handleCancelBooking = async () => {
  try {
    const response = await API.patch(`/bookings/${booking_id}/status`, {new_status: "CANCELLED" });
    setBooking(response.data);
    setShowConfirm(false);
    setTimeout(() => navigate("/bookings"), 500);
  } catch (error) {
    console.error("Error cancelling booking:", error);
    alert("Failed to cancel booking.");
  }
};

  useEffect(() => {
    fetchBookingDetails();
  }, [fetchBookingDetails]);

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
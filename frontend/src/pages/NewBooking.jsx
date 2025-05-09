/*

Page for creating a new booking
Author: Kirill Smirnov

*/

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import API from "@/utils/api";
import NewBookingComponent from "@/components/ui/NewBookingComponent";
import "@/assets/styles/index.css";

// NewBooking component to create a new booking
const NewBooking = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { van, startDate, endDate } = state || {};

  // Data template for the booking
  const [formData, setFormData] = useState({
    van_id: van?._id || "",
    start_date: startDate || "",
    end_date: endDate || "",
    pick_up_location: "",
    return_location: "",
    delivery_location: "",
    promocode: "",
    status: "PENDING",
    paid: false,
    deliveryRequired: false,
  });

  const [vans, setVans] = useState([van]);
  const [selectedVan, setSelectedVan] = useState(van);
  const [amount, setAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [promoError, setPromoError] = useState("");

  // Calculate the amount based on the selected van and dates
  useEffect(() => {
    if (van) {
      const days = Math.ceil( (new Date(endDate) - new Date(startDate))/(1000*60*60*24) ); // Number of days between two dates
      const calculatedAmount = days * van.price;
      setAmount(calculatedAmount);
      setSelectedVan(van);
    }
  }, [van, startDate, endDate]);

  // Amount calculation
  useEffect(() => {
    setFinalAmount(amount - (amount * discount) / 100);
  }, [amount, discount]);

  // Validate promocode
  useEffect(() => { if (formData.promocode) {
      validatePromocode(formData.promocode);
    }
  }, [formData.promocode]);

  // This function checks if the promocode is valid and applies the discount
  const validatePromocode = async (code) => {
    if (!code.trim()) {
      setDiscount(0);
      setPromoError("");
      return;
    }

    try {
      const response = await API.get("/deals/");

      const deal = response.data.deals.find(
        (deal) => deal.promocode === code.trim()
      );

      if (deal) {
        const now = new Date();
        const start = new Date(deal.start_date);
        const end = new Date(deal.end_date);

        if (now >= start && now <= end) {
          setDiscount(deal.discount);
          setPromoError("");
        } else {
          setDiscount(0);
          setPromoError("This promocode is not valid at the moment");
        }
      } else {
        setDiscount(0);
        setPromoError("Invalid promocode.");
      }
    } catch (error) {
      //console.error("Failed to validate promocode:", error);
      setPromoError("Error validating promocode");
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle radio button changes
  const handleRadioChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      deliveryRequired: value === "delivery",
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.promocode && promoError) {
      alert("Invalid promocode");
      return;
    }

    try {
      const {
        promocode,
        pick_up_location,
        delivery_location,
        ...otherFields
      } = formData;

      const bookingData = {
        ...otherFields,
        amount: finalAmount,
        ...(promocode.trim() && { promocode: promocode.trim() }),
        ...(formData.deliveryRequired
          ? {
              delivery_location: delivery_location.trim(),
              pick_up_location: "",
            }
          : {
              pick_up_location: pick_up_location.trim(),
              delivery_location: "",
            }),
      };

      const response = await API.post("/bookings", bookingData);

      const newBooking = response.data;
      navigate(`/bookings/${newBooking._id}`);
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Failed to create booking");
    }
  };

  // Render the booking form
  return (
    <MainLayout>
      <div className="p-4 m-8 max-w-4xl mx-auto">
        <NewBookingComponent
          van={van}
          startDate={startDate}
          endDate={endDate}
          formData={formData}
          amount={amount}
          discount={discount}
          finalAmount={finalAmount}
          promoError={promoError}
          onInputChange={handleChange}
          onRadioChange={handleRadioChange}
          onSubmit={handleSubmit}
        />
      </div>
    </MainLayout>
  );
};

export default NewBooking;

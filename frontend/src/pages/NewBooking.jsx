import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import API from "@/utils/api";
import "@/assets/styles/index.css";

const NewBooking = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { van, startDate, endDate } = state || {};

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

  useEffect(() => {
    if (van) {
      const days = Math.ceil(
        (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
      );
      const calculatedAmount = days * van.price;
      setAmount(calculatedAmount);
      setSelectedVan(van);
    }
  }, [van, startDate, endDate]);

  useEffect(() => {
    setFinalAmount(amount - (amount * discount) / 100);
  }, [amount, discount]);

  useEffect(() => { if (formData.promocode) {
      validatePromocode(formData.promocode);
    }
  }, [formData.promocode]);

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
          setPromoError("This promocode is not valid at the moment.");
        }
      } else {
        setDiscount(0);
        setPromoError("Invalid promocode.");
      }
    } catch (error) {
      console.error("Failed to validate promocode:", error);
      setPromoError("Error validating promocode.");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRadioChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      deliveryRequired: value === "delivery",
    }));
  };

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

  return (
    <MainLayout>
      <div className="p-4 m-8">
        <form
          onSubmit={handleSubmit}
          className="bg-[#dcf2eb] shadow-md rounded-2xl p-6 max-w-4xl mx-auto space-y-4 text-left"
        >
          <h1 className="text-2xl font-bold mb-4">Create a Booking</h1>

          <div className="text-gray-700 font-medium mb-2">
            <strong>Van:</strong> {selectedVan?.manufacturer}{" "}
            {selectedVan?.model}
          </div>

          <div className="text-gray-700 font-medium mb-2">
            <strong>Daily Price:</strong> ${selectedVan?.price}
          </div>

          <div className="text-gray-700 font-medium mb-2">
            <strong>Start Date:</strong> {startDate}
          </div>

          <div className="text-gray-700 font-medium mb-2">
            <strong>End Date:</strong> {endDate}
          </div>

          <input
            type="text"
            name="return_location"
            placeholder="Return location"
            value={formData.return_location}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          <div className="flex space-x-4 mb-4">
            <label>
              <input
                type="radio"
                name="deliveryRequired"
                value="pickup"
                checked={!formData.deliveryRequired}
                onChange={handleRadioChange}
                className="mr-2"
              />
              I'll pick up
            </label>
            <label>
              <input
                type="radio"
                name="deliveryRequired"
                value="delivery"
                checked={formData.deliveryRequired}
                onChange={handleRadioChange}
                className="mr-2"
              />
              I need a delivery
            </label>
          </div>

          {!formData.deliveryRequired ? (
            <input
              type="text"
              name="pick_up_location"
              placeholder="Pickup location (optional)"
              value={formData.pick_up_location}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          ) : (
            <input
              type="text"
              name="delivery_location"
              placeholder="Delivery location (optional)"
              value={formData.delivery_location}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          )}

          <input
            type="text"
            name="promocode"
            placeholder="Promocode (optional)"
            value={formData.promocode}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              formData.promocode
                ? promoError
                  ? "bg-red-300"
                  : "bg-green-300"
                : ""
            }`}
          />

          <div className="text-lg font-semibold text-gray-700">
            Total Amount:{" "}
            {discount > 0 ? (
              <>
                <span className="text-red-600 line-through text-xl">
                  ${amount}
                </span>{" "}
                <span className="text-green-700 font-bold text-2xl ml-2">
                  ${finalAmount}
                </span>
              </>
            ) : (
              <span className="text-green-700 font-bold text-2xl">
                ${amount}
              </span>
            )}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full text-xl"
            >
              Book Now
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default NewBooking;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";

const NewBooking = () => {
  const navigate = useNavigate();
  const [vans, setVans] = useState([]);
  const [selectedVan, setSelectedVan] = useState(null);
  const [formData, setFormData] = useState({
    van_id: "",
    start_date: "",
    end_date: "",
    pick_up_location: "",
    return_location: "",
    delivery_location: "",
    promocode: "",
    status: "PENDING",
    paid: false,
    deliveryRequired: false,
  });

  const [amount, setAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [promoError, setPromoError] = useState("");

    useEffect(() => {
        const fetchAvailableVans = async () => {
        try {
            const response = await fetch("http://wild-play-api.vercel.app/api/campers", {
            credentials: "include",
            });

            const data = await response.json();
            const available = data.campers.filter((van) => van.isAvailable);
            setVans(available);
        } catch (error) {
            console.error("Failed to load vans:", error);
        }
        };

        fetchAvailableVans();
    }, []);

    useEffect(() => {
            const { start_date, end_date, van_id } = formData;

            if (start_date && end_date && van_id) {
            const start = new Date(start_date);
            const end = new Date(end_date);
            const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
            const van = vans.find((v) => v._id === van_id);
            if (van && days > 0) {
                const calculatedAmount = days * van.price;
                setAmount(calculatedAmount);
                setSelectedVan(van);
            } else {
                setAmount(0);
                setSelectedVan(null);
            }
            }
    }, [formData.start_date, formData.end_date, formData.van_id, vans]);

    useEffect(() => {
        setFinalAmount(amount - (amount * discount) / 100);
    }, [amount, discount]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

    if (name === "van_id") {
        const selected = vans.find((v) => v._id === value);
        setSelectedVan(selected || null);
    }

    if (name === "promocode") {
        validatePromocode(value);
    }
  };

    const validatePromocode = async (code) => {
            if (!code.trim()) {
                setDiscount(0);
                setPromoError("");
                return;
            }

        try {
            const response = await fetch("http://wild-play-api.vercel.app/api/deals/", {
                credentials: "include",
            });
            const data = await response.json();
            const deal = data.deals.find(
                (deal) => deal.promocode === code.trim()
            );

        if (deal) {
            const now = new Date();
            const startDate = new Date(deal.start_date);
            const endDate = new Date(deal.end_date);

            if (now >= startDate && now <= endDate) {
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
        const { promocode, pick_up_location, delivery_location, ...otherFields } = formData;

        const bookingData = {
            ...otherFields,
            amount: finalAmount,
            ...(promocode.trim() && { promocode: promocode.trim() }),
            ...(formData.deliveryRequired
            ? { delivery_location: delivery_location.trim(), pick_up_location: "" }
            : { pick_up_location: pick_up_location.trim(), delivery_location: "" }),
        };

        const response = await fetch("http://wild-play-api.vercel.app/api/bookings", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bookingData),
        });

        if (!response.ok) throw new Error("Failed to create booking");

            const newBooking = await response.json();
            navigate(`/bookings/${newBooking._id}`);
        } catch (error) {
            console.error("Error creating booking:", error);
            alert("Failed to create booking");
        }
    };

    const today = new Date().toISOString().split("T")[0];

    return (
        <MainLayout>
            <div className="p-4 m-8">
                <form onSubmit={handleSubmit} className="bg-[#dcf2eb] shadow-md rounded-2xl p-6 max-w-4xl mx-auto space-y-4 text-left" >
                <h1 className="text-2xl font-bold mb-4">Create a Booking</h1>

                <select name="van_id" value={formData.van_id} onChange={handleChange} required className="w-full p-2 border rounded" >
                    <option value="">Select a van</option>
                    {vans.map((van) => (
                    <option key={van._id} value={van._id}>
                        {van.manufacturer} {van.model}
                    </option>
                    ))}
                </select>

                {selectedVan && (
                    <div className="text-gray-700 font-medium mb-2">
                        Daily price: <span className="font-bold text-green-700">${selectedVan.price}</span>
                    </div>
                )}

                <input type="date" name="start_date" value={formData.start_date} onChange={handleChange} required className="w-full p-2 border rounded" min={today} />

                    <input type="date" name="end_date" value={formData.end_date} onChange={handleChange} required className="w-full p-2 border rounded" min={
                        formData.start_date
                        ? new Date(new Date(formData.start_date).getTime() + 24 * 60 * 60 * 1000)
                            .toISOString()
                            .split("T")[0]
                        : today
                    }
                    />

                <input type="text" name="return_location" placeholder="Return location" value={formData.return_location} onChange={handleChange} required className="w-full p-2 border rounded" />

                <div className="flex space-x-4 mb-4">
                    <label>
                        <input type="radio" name="deliveryRequired" value="pickup" checked={!formData.deliveryRequired} onChange={handleRadioChange} className="mr-2" />
                        I'll pick up
                    </label>
                    <label>
                        <input type="radio" name="deliveryRequired" value="delivery" checked={formData.deliveryRequired} onChange={handleRadioChange} className="mr-2" />
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

                    <input type="text" name="promocode" placeholder="Promocode (optional)" value={formData.promocode} onChange={handleChange}
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
                        <span className="text-red-600 line-through text-xl">${amount}</span>{" "}
                        <span className="text-green-700 font-bold text-2xl ml-2">${finalAmount}</span>
                    </>
                    ) : (
                    <span className="text-green-700 font-bold text-2xl">${amount}</span>
                    )}
                </div>

                <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full text-xl" >
                    Create booking
                </button>
                </form>
            </div>
        </MainLayout>
    );
};

export default NewBooking;

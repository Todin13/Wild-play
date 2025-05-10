/*

Style component for the booking details with van info
Main Author: Kirill Smirnov
Button to create trip added by: ODIN Thomas

*/

import React from "react";
import {
  CalendarIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  TruckIcon,
  CubeIcon,
  UserIcon,
  InformationCircleIcon,
  XCircleIcon,
  CheckCircleIcon,
  GiftIcon,
} from "@heroicons/react/24/outline";
import { PaintBrushIcon } from "@heroicons/react/24/outline";
import Button from "@/components/ui/Buttons";
import Title from "@/components/ui/Titles";
import { useNavigate } from "react-router-dom";

const BookingDetailsComponent = ({
  booking,
  onCancelBooking,
  showConfirm,
  setShowConfirm,
  onPay,
}) => {
  const formatDate = (dateStr) =>
    dateStr ? new Date(dateStr).toLocaleDateString() : null;

  const navigate = useNavigate();

  const handleCreateTrip = () => {
    const tripData = {
      title: `Trip from booking ${booking._id}`,
      start_date: booking.start_date.slice(0, 10),
      end_date: booking.end_date.slice(0, 10),
      locations: [
        {
          name: `${booking.pick_up_location}`,
          section: "pickup",
          lat: "",
          lon: "",
          info: "",
        },
        {
          name: `${booking.return_location}`,
          section: "return",
          lat: "",
          lon: "",
          info: "",
        },
      ],
      van_id: booking.van_id._id,
      van_booked: true,
      notes: [
        `Van type: ${booking.van_id.manufacturer} ${booking.van_id.model}`,
        `Price: $${booking.amount}`, // Modify this if the price is stored differently
      ],
    };

    navigate("/plan-trip", { state: { trip: tripData } });
  };

  return (
    <div className="w-full rounded-2xl shadow-lg p-6 bg-voga-card border border-voga-border">
      <div className="space-y-6">
        {/* Booking Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-voga-border pb-4">
          <Title variant="section">Booking Details</Title>
          <div className="flex flex-wrap gap-2">
            <span
              className={`px-3 py-1 rounded-full text-white text-sm font-bold ${
                booking?.status === "PENDING"
                  ? "bg-gray-400"
                  : booking?.status === "CONFIRMED"
                  ? "bg-green-400"
                  : "bg-red-400"
              }`}
            >
              {booking.status}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-white text-sm font-bold ${
                booking?.paid ? "bg-green-400" : "bg-red-400"
              }`}
            >
              {booking.paid ? "Paid" : "Not paid"}
            </span>
          </div>
        </div>

        {/* Booking Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Booking Info */}
          <div className="space-y-4">
            <div className="flex items-start">
              <CalendarIcon className="w-5 h-5 mr-2 mt-0.5 text-voga-accent" />
              <div>
                <h3 className="text-sm font-semibold text-voga-text">Dates</h3>
                <p className="text-sm text-voga-title">
                  <strong>Start:</strong> {formatDate(booking.start_date)}
                </p>
                <p className="text-sm text-voga-title">
                  <strong>End:</strong> {formatDate(booking.end_date)}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <MapPinIcon className="w-5 h-5 mr-2 mt-0.5 text-voga-accent" />
              <div>
                <h3 className="text-sm font-semibold text-voga-text">
                  Locations
                </h3>
                {booking.pick_up_location && (
                  <p className="text-sm text-voga-title">
                    <strong>Pickup:</strong> {booking.pick_up_location}
                  </p>
                )}
                {booking.return_location && (
                  <p className="text-sm text-voga-title">
                    <strong>Return:</strong> {booking.return_location}
                  </p>
                )}
                {booking.delivery_location && (
                  <p className="text-sm text-voga-title">
                    <strong>Delivery:</strong> {booking.delivery_location}
                  </p>
                )}
              </div>
            </div>

            {booking.promocode && (
              <div className="flex items-start">
                <GiftIcon className="w-5 h-5 mr-2 mt-0.5 text-voga-accent" />
                <div>
                  <h3 className="text-sm font-semibold text-voga-text">
                    Promocode
                  </h3>
                  <p className="text-sm text-voga-title">{booking.promocode}</p>
                </div>
              </div>
            )}

            <div className="flex items-start">
              <CurrencyDollarIcon className="w-5 h-5 mr-2 mt-0.5 text-voga-accent" />
              <div>
                <h3 className="text-sm font-semibold text-voga-text">Amount</h3>
                <p className="text-lg font-bold text-voga-title">
                  ${booking.amount}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Van Info */}
          <div className="space-y-4">
            <div className="flex items-start">
              <TruckIcon className="w-5 h-5 mr-2 mt-0.5 text-voga-accent" />
              <div>
                <h3 className="text-sm font-semibold text-voga-text">Van</h3>
                <p className="text-sm text-voga-title">
                  {booking.van_id.manufacturer} {booking.van_id.model}
                </p>
                <p className="text-sm text-voga-title">
                  <strong>Type:</strong> {booking.van_id.type}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <PaintBrushIcon className="w-5 h-5 mr-2 mt-0.5 text-voga-accent" />
              <div>
                <h3 className="text-sm font-semibold text-voga-text">
                  Appearance
                </h3>
                <p className="text-sm text-voga-title">
                  <strong>Color:</strong> {booking.van_id.color}
                </p>
                <p className="text-sm text-voga-title">
                  <strong>Fuel:</strong> {booking.van_id.fuel}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <UserIcon className="w-5 h-5 mr-2 mt-0.5 text-voga-accent" />
              <div>
                <h3 className="text-sm font-semibold text-voga-text">
                  Capacity
                </h3>
                <p className="text-sm text-voga-title">
                  <strong>Seats:</strong> {booking.van_id.seats}
                </p>
                <p className="text-sm text-voga-title">
                  <strong>Beds:</strong> {booking.van_id.beds}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <CubeIcon className="w-5 h-5 mr-2 mt-0.5 text-voga-accent" />
              <div>
                <h3 className="text-sm font-semibold text-voga-text">
                  Dimensions
                </h3>
                <p className="text-sm text-voga-title">
                  {Array.isArray(booking.van_id.dimension)
                    ? booking.van_id.dimension.join("m × ") + "m"
                    : "N/A"}
                </p>
                <p className="text-sm text-voga-title">
                  <strong>Weight:</strong> {booking.van_id.weight} kg
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Utilities */}
        {booking.van_id.utilities && (
          <div className="pt-2">
            <h3 className="text-sm font-semibold text-voga-text mb-2">
              Utilities
            </h3>
            <div className="flex flex-wrap gap-2">
              {(Array.isArray(booking.van_id.utilities)
                ? booking.van_id.utilities
                : Object.entries(booking.van_id.utilities[0])
                    .filter(([_, value]) => value)
                    .map(([key]) => key)
              ).map((utility, index) => (
                <span
                  key={index}
                  className="bg-green-700 text-white text-xs font-bold px-3 py-1 rounded-full"
                >
                  {utility}
                </span>
              ))}
            </div>
          </div>
        )}

        {!booking.paid && booking.status !== "CANCELLED" && (
          <div className="pt-4 text-center">
            <Button variant="primary" onClick={onPay}>
              Pay Now
            </Button>
          </div>
        )}

        {/* Cancel Button and Create Trip Button */}
        {booking.status !== "CANCELLED" && (
          <div className="flex justify-center gap-4 pt-1">
            <Button variant="primary" onClick={() => setShowConfirm(true)}>
              Cancel Booking
            </Button>

            {booking.status === "CONFIRMED" && (
              <Button onClick={handleCreateTrip}>
                Create Trip from Booking
              </Button>
            )}
          </div>
        )}

        {/* Confirmation Modal */}
        {showConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl text-center space-y-4 max-w-sm w-full">
              <Title>Do you want to cancel this booking?</Title>
              <div className="flex justify-center gap-4">
                <Button
                  onClick={onCancelBooking}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <div className="flex items-center">
                    <CheckCircleIcon className="w-10 h-10 mr-1" />
                    Cancel booking
                  </div>
                </Button>

                <Button
                  onClick={() => setShowConfirm(false)}
                  className=" flex items-center bg-gray-300 hover:bg-gray-400 text-gray-800"
                >
                  <div className="flex items-center">
                    <XCircleIcon className="w-10 h-10 mr-1" />
                    Keep the booking
                  </div>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingDetailsComponent;

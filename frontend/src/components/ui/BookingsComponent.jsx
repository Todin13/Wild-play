import React from "react";
import { Link } from "react-router-dom";
import {CalendarDaysIcon, TruckIcon, MapPinIcon, CurrencyDollarIcon, GiftIcon} from "@heroicons/react/24/outline";

const BookingsComponent = ({ bookings, loading }) => {
    const formatDate = (dateStr) => dateStr ? new Date(dateStr).toLocaleDateString() : null;

    if (loading) {
        return (<div className="text-center text-lg col-span-full">Loading...</div>);
    }

    if (bookings.length === 0) {
        return (<div className="text-center text-lg col-span-full">No bookings found.</div>);
    }

    return (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {bookings.map((booking) => (
                <Link key={booking._id} to={`/bookings/${booking._id}`} className="bg-voga-card border border-voga-border rounded-2xl p-4 flex flex-col h-full hover:shadow-lg transition-all duration-200">
                
                {/* Van Info Header */}
                <div className="flex items-start mb-4">
                    <TruckIcon className="w-5 h-5 mr-2 mt-1 text-voga-accent" />
                    <div>
                        <h2 className="text-lg font-bold text-voga-title">
                            {booking?.van_id?.color} {booking?.van_id?.manufacturer}{" "}
                            {booking?.van_id?.model}
                        </h2>
                        <div className="flex items-center text-sm text-voga-textMuted">
                            <CalendarDaysIcon className="w-4 h-4 mr-1" />
                            <span>{formatDate(booking?.start_date)} - {formatDate(booking?.end_date)}</span>
                        </div>
                    </div>
                </div>

                {/* Booking Details */}
                <div className="space-y-3 mb-4">
                    {booking?.pick_up_location && (
                    <div className="flex items-start">
                        <MapPinIcon className="w-5 h-5 mr-2 mt-0.5 text-voga-accent" />
                        <div>
                            <p className="text-sm text-voga-text">Pickup location</p>
                            <p className="text-sm font-medium text-voga-title">{booking?.pick_up_location}</p>
                        </div>
                    </div>
                    )}

                    {booking?.delivery_location && (
                    <div className="flex items-start">
                        <MapPinIcon className="w-5 h-5 mr-2 mt-0.5 text-voga-accent" />
                        <div>
                            <p className="text-sm text-voga-text">Delivery location</p>
                            <p className="text-sm font-medium text-voga-title">{booking?.delivery_location}</p>
                        </div>
                    </div>
                    )}

                    {booking?.return_location && (
                    <div className="flex items-start">
                        <MapPinIcon className="w-5 h-5 mr-2 mt-0.5 text-voga-accent" />
                        <div>
                            <p className="text-sm text-voga-text">Return location</p>
                            <p className="text-sm font-medium text-voga-title">{booking?.return_location}</p>
                        </div>
                    </div>
                    )}

                    {booking?.promocode && (
                    <div className="flex items-start">
                        <GiftIcon className="w-5 h-5 mr-2 mt-0.5 text-voga-accent" />
                        <div>
                            <p className="text-sm text-voga-text">Promocode</p>
                            <p className="text-sm font-medium text-voga-title">{booking?.promocode}</p>
                        </div>
                    </div>
                    )}

                    {booking?.amount && (
                    <div className="flex items-start">
                        <CurrencyDollarIcon className="w-5 h-5 mr-2 mt-0.5 text-voga-accent" />
                        <div>
                            <p className="text-sm text-voga-text">Amount</p>
                            <p className="text-sm font-bold text-green-600">${booking?.amount}</p>
                        </div>
                    </div>
                    )}
                </div>

                {/* Status Badges */}
                <div className="flex justify-between mt-auto">
                    <span
                    className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                        booking?.status === "PENDING"
                        ? "bg-gray-400"
                        : booking?.status === "CONFIRMED"
                        ? "bg-green-400"
                        : "bg-red-400"
                    }`}
                    >
                    {booking?.status}
                    </span>

                    <span
                    className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                        booking?.paid ? "bg-green-400" : "bg-red-400"
                    }`}
                    >
                    {booking?.paid ? "Paid" : "Not paid"}
                    </span>
                </div>
                </Link>
            ))}
        </div>
    );
};

export default BookingsComponent;
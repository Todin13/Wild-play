/*

style component for the booking form
Author: Kirill Smirnov

*/

import React from "react";
import {CalendarIcon, MapPinIcon, CurrencyDollarIcon, TruckIcon, GiftIcon} from "@heroicons/react/24/outline";
import Button from "@/components/ui/Buttons";
import Title from "@/components/ui/Titles";

const NewBookingComponent = ({
    van,
    startDate,
    endDate,
    formData,
    amount,
    discount,
    finalAmount,
    promoError,
    onInputChange,
    onRadioChange,
    onSubmit,
  }) => {
    const days = Math.ceil(
      (new Date(endDate) - new Date(startDate))/(1000*60*60*24) // Number of days between two dates
    );
    
    // Booking form
    return (
        <div className="w-full rounded-2xl shadow-lg p-6 border bg-white/85 backdrop-blur-md transition-all duration-200">
          <div className="space-y-6">

        {/* Title Section */}
        <Title variant="section" className="text-center">Create Booking</Title>

        {/* Van Info Section */}
        <div className="border-b border-voga-border pb-4">
          <h2 className="text-xl font-bold text-voga-title"> {van.manufacturer} {van.model} </h2>
          <div className="flex items-center text-sm text-voga-textMuted mt-1">
            <TruckIcon className="w-5 h-5 mr-1 text-voga-accent" /> {van.type} </div>
        </div>

        {/* Booking Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <CalendarIcon className="w-5 h-5 mr-2 text-voga-accent" />
            <div>
              <h3 className="text-sm font-semibold text-voga-text">Start Date</h3>
              <p className="text-sm text-voga-title">{startDate}</p>
            </div>
          </div>

          <div className="flex items-center">
            <CalendarIcon className="w-5 h-5 mr-2 text-voga-accent" />
            <div>
              <h3 className="text-sm font-semibold text-voga-text">End Date</h3>
              <p className="text-sm text-voga-title">{endDate}</p>
            </div>
          </div>

          <div className="flex items-center">
            <CurrencyDollarIcon className="w-5 h-5 mr-2 text-voga-accent" />
            <div>
              <h3 className="text-sm font-semibold text-voga-text">Daily Price</h3>
              <p className="text-sm text-voga-title">${van.price}</p>
            </div>
          </div>

          <div className="flex items-center">
            <CalendarIcon className="w-5 h-5 mr-2 text-voga-accent" />
            <div>
              <h3 className="text-sm font-semibold text-voga-text">Duration</h3>
              <p className="text-sm text-voga-title">{days} days</p>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <form onSubmit={onSubmit} className="space-y-4">
          {/* Return Location */}
          <div>
            <label className="block text-sm font-semibold text-voga-text mb-1"> Return Location </label>
            <div className="relative">
              <MapPinIcon className="absolute left-3 top-3 h-5 w-5 text-voga-accent" />
              <input
                type="text"
                name="return_location"
                value={formData.return_location}
                onChange={onInputChange}
                required
                className="w-full pl-10 p-2 border border-voga-border rounded-lg"
                placeholder="Van return location"
              />
            </div>
          </div>

          {/* Delivery Options */}
          <div>
            <label className="block text-sm font-semibold text-voga-text mb-2"> Delivery Optionы </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="deliveryRequired"
                  value="pickup"
                  checked={!formData.deliveryRequired}
                  onChange={onRadioChange}
                  className="mr-2 text-voga-accent"
                />
                <span className="text-sm text-voga-title">I'll pick up</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="deliveryRequired"
                  value="delivery"
                  checked={formData.deliveryRequired}
                  onChange={onRadioChange}
                  className="mr-2 text-voga-accent"
                />
                <span className="text-sm text-voga-title">I need delivery</span>
              </label>
            </div>
          </div>

          {/* Location Field */}
          {!formData.deliveryRequired ? (
            <div>
              <label className="block text-sm font-semibold text-voga-text mb-1"> Pickup Location </label>
              <div className="relative">
                <MapPinIcon className="absolute left-3 top-3 h-5 w-5 text-voga-accent" />
                <input
                  type="text"
                  name="pick_up_location"
                  value={formData.pick_up_location}
                  onChange={onInputChange}
                  className="w-full pl-10 p-2 border border-voga-border rounded-lg"
                  placeholder="Van pickup location"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-semibold text-voga-text mb-1"> Delivery Location </label>
              <div className="relative">
                <MapPinIcon className="absolute left-3 top-3 h-5 w-5 text-voga-accent" />
                <input
                  type="text"
                  name="delivery_location"
                  value={formData.delivery_location}
                  onChange={onInputChange}
                  className="w-full pl-10 p-2 border border-voga-border rounded-lg"
                  placeholder="Van delivery location"
                />
              </div>
            </div>
          )}

          {/* Promocode */}
          <div>
            <label className="block text-sm font-semibold text-voga-text mb-1"> Promocode </label>
            <div className="relative">
              <GiftIcon className="absolute left-3 top-3 h-5 w-5 text-voga-accent" />
              <input
                type="text"
                name="promocode"
                value={formData.promocode}
                onChange={onInputChange}
                className={`w-full pl-10 p-2 border rounded-lg ${
                  formData.promocode
                    ? promoError
                      ? "border-red-300 bg-red-50"
                      : "border-green-300 bg-green-50"
                    : "border-voga-border"
                }`}
                placeholder="**********"
              />
            </div>
            {promoError && (
              <p className="text-red-500 text-xs mt-1">{promoError}</p>
            )}
          </div>

          {/* Price Summary */}
          <div className="border-t border-voga-border pt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-voga-text">Subtotal:</span>
              <span className="text-sm font-semibold text-voga-title"> ${amount} </span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-voga-text">Discount:</span>
                <span className="text-sm font-semibold text-green-600"> -${amount - finalAmount} ({discount}%) </span>
              </div>
            )}
            
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-voga-text">Total:</span>
              <span className="text-xl font-bold text-green-600"> ${finalAmount} </span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 text-center">
            <Button variant="primary" type="submit" className="w-full py-3 text-lg" > Confirm Booking </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewBookingComponent;
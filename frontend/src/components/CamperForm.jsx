// src/components/CamperForm.jsx
import React, { useState } from "react";
import API from "../utils/api";

const CamperForm = ({ onAdded }) => {
  const [formData, setFormData] = useState({
    type: "",
    manufacturer: "",
    model: "",
    price: "",
    seats: "",
    beds: "",
    transmission: "",
    baseRate: "",
    color: "",
    location: "",
    weight: "",
    // dimension fields will be combined into an array on submit
    dimensionLength: "",
    dimensionWidth: "",
    dimensionHeight: "",
    isAvailable: false,
    utilities: "",
    info: "",
  });
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Universal change handler for all form inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");
    // Prepare payload with proper types
    const payload = {
      ...formData,
      price: Number(formData.price),
      seats: Number(formData.seats),
      beds: Number(formData.beds),
      baseRate: Number(formData.baseRate),
      weight: Number(formData.weight),
      // Combine dimensions into an array of numbers
      dimension: [
        Number(formData.dimensionLength),
        Number(formData.dimensionWidth),
        Number(formData.dimensionHeight),
      ],
      // Split comma-separated utilities into an array
      utilities: formData.utilities 
        ? formData.utilities.split(",").map((u) => u.trim()) 
        : [],
    };
    // Remove the temporary dimension fields used in state
    delete payload.dimensionLength;
    delete payload.dimensionWidth;
    delete payload.dimensionHeight;

    try {
      const response = await API.post("/campers", payload);
      setSuccessMsg("Camper added successfully!");
      // If parent provided onAdded, call it with the new camper data
      if (onAdded && response.data) {
        onAdded(response.data);
      }
      // Reset form fields after successful submission
      setFormData({
        type: "",
        manufacturer: "",
        model: "",
        price: "",
        seats: "",
        beds: "",
        transmission: "",
        baseRate: "",
        color: "",
        location: "",
        weight: "",
        dimensionLength: "",
        dimensionWidth: "",
        dimensionHeight: "",
        isAvailable: false,
        utilities: "",
        info: "",
      });
    } catch (err) {
      console.error("Add camper error:", err);
      setErrorMsg("Failed to add camper. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Success or error feedback */}
      {successMsg && <p className="text-green-600">{successMsg}</p>}
      {errorMsg && <p className="text-red-600">{errorMsg}</p>}

      {/* Camper fields inputs */}
      <div>
        <label className="block font-medium">Type:</label>
        <input 
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          type="text"
          required 
        />
      </div>
      <div>
        <label className="block font-medium">Manufacturer:</label>
        <input 
          name="manufacturer"
          value={formData.manufacturer}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          type="text"
          required 
        />
      </div>
      <div>
        <label className="block font-medium">Model:</label>
        <input 
          name="model"
          value={formData.model}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          type="text"
          required 
        />
      </div>
      <div>
        <label className="block font-medium">Price (per day):</label>
        <input 
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          type="number"
          required 
        />
      </div>
      <div>
        <label className="block font-medium">Seats:</label>
        <input 
          name="seats"
          value={formData.seats}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          type="number"
          required 
        />
      </div>
      <div>
        <label className="block font-medium">Beds:</label>
        <input 
          name="beds"
          value={formData.beds}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          type="number"
          required 
        />
      </div>
      <div>
        <label className="block font-medium">Transmission:</label>
        <input 
          name="transmission"
          value={formData.transmission}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          type="text"
          required 
        />
      </div>
      <div>
        <label className="block font-medium">Base Rate (per day):</label>
        <input 
          name="baseRate"
          value={formData.baseRate}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          type="number"
          required 
        />
      </div>
      <div>
        <label className="block font-medium">Color:</label>
        <input 
          name="color"
          value={formData.color}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          type="text" 
        />
      </div>
      <div>
        <label className="block font-medium">Location:</label>
        <input 
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          type="text"
          required 
        />
      </div>
      <div>
        <label className="block font-medium">Weight (kg):</label>
        <input 
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          type="number" 
        />
      </div>
      <div>
        <label className="block font-medium">Dimensions (m):</label>
        <div className="flex space-x-2">
          <input 
            name="dimensionLength"
            value={formData.dimensionLength}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            type="number"
            placeholder="Length" 
          />
          <input 
            name="dimensionWidth"
            value={formData.dimensionWidth}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            type="number"
            placeholder="Width" 
          />
          <input 
            name="dimensionHeight"
            value={formData.dimensionHeight}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            type="number"
            placeholder="Height" 
          />
        </div>
      </div>
      <div>
        <label className="flex items-center space-x-2">
          <input 
            name="isAvailable"
            type="checkbox"
            checked={formData.isAvailable}
            onChange={handleChange}
          />
          <span>Available for rent</span>
        </label>
      </div>
      <div>
        <label className="block font-medium">Utilities (comma separated):</label>
        <input 
          name="utilities"
          value={formData.utilities}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          type="text"
          placeholder="e.g. Refrigerator, Solar Panel" 
        />
      </div>
      <div>
        <label className="block font-medium">Info (additional details):</label>
        <textarea 
          name="info"
          value={formData.info}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          rows="3"
        />
      </div>

      <button 
        type="submit" 
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Camper
      </button>
    </form>
  );
};

export default CamperForm;

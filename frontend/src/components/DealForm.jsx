// src/components/DealForm.jsx
import React, { useState } from "react";
import API from "../utils/api";

const DealForm = ({ onAdded }) => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    baseRate: "",
    location: "",
    imageUrl: "",
    specs: "",
    linkInfo: "",
    linkBook: "",
  });
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
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
      baseRate: Number(formData.baseRate),
      // Split comma-separated specs into an array
      specs: formData.specs 
        ? formData.specs.split(",").map((s) => s.trim()) 
        : [],
    };
    try {
      const response = await API.post("/deals", payload);
      setSuccessMsg("Deal added successfully!");
      if (onAdded && response.data) {
        onAdded(response.data);
      }
      // Reset form fields on success
      setFormData({
        title: "",
        price: "",
        baseRate: "",
        location: "",
        imageUrl: "",
        specs: "",
        linkInfo: "",
        linkBook: "",
      });
    } catch (err) {
      console.error("Add deal error:", err);
      setErrorMsg("Failed to add deal. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {successMsg && <p className="text-green-600">{successMsg}</p>}
      {errorMsg && <p className="text-red-600">{errorMsg}</p>}

      <div>
        <label className="block font-medium">Title:</label>
        <input 
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          type="text"
          required 
        />
      </div>
      <div>
        <label className="block font-medium">Price (discounted):</label>
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
        <label className="block font-medium">Base Rate (original):</label>
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
        <label className="block font-medium">Image URL:</label>
        <input 
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          type="url"
          placeholder="https://example.com/deal.jpg" 
        />
      </div>
      <div>
        <label className="block font-medium">Specs (comma separated):</label>
        <input 
          name="specs"
          value={formData.specs}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          type="text"
          placeholder="e.g. 20% off, Limited time" 
        />
      </div>
      <div>
        <label className="block font-medium">Info Link (URL):</label>
        <input 
          name="linkInfo"
          value={formData.linkInfo}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          type="url"
          placeholder="https://example.com/details" 
        />
      </div>
      <div>
        <label className="block font-medium">Booking Link (URL):</label>
        <input 
          name="linkBook"
          value={formData.linkBook}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          type="url"
          placeholder="https://example.com/book-now" 
        />
      </div>

      <button 
        type="submit" 
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Deal
      </button>
    </form>
  );
};

export default DealForm;

import React from "react";

const CamperFormFields = ({ formData, handleChange }) => (
  <>
{/* Two-column grid for inputs */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label className="block font-medium">Type:</label>
      <input name="type" value={formData.type} onChange={handleChange} className="border rounded p-2 w-full" type="text" required />
    </div>
    <div>
      <label className="block font-medium">Manufacturer:</label>
      <input name="manufacturer" value={formData.manufacturer} onChange={handleChange} className="border rounded p-2 w-full" type="text" required />
    </div>
    <div>
      <label className="block font-medium">Model:</label>
      <input name="model" value={formData.model} onChange={handleChange} className="border rounded p-2 w-full" type="text" required />
    </div>
    <div>
      <label className="block font-medium">Price (per day):</label>
      <input name="price" value={formData.price} onChange={handleChange} className="border rounded p-2 w-full" type="number" required />
    </div>
    <div>
      <label className="block font-medium">Seats:</label>
      <input name="seats" value={formData.seats} onChange={handleChange} className="border rounded p-2 w-full" type="number" required />
    </div>
    <div>
      <label className="block font-medium">Beds:</label>
      <input name="beds" value={formData.beds} onChange={handleChange} className="border rounded p-2 w-full" type="number" required />
    </div>
    <div>
      <label className="block font-medium">Transmission:</label>
      <input name="transmission" value={formData.transmission} onChange={handleChange} className="border rounded p-2 w-full" type="text" required />
    </div>
    <div>
      <label className="block font-medium">Base Rate (per day):</label>
      <input name="baseRate" value={formData.baseRate} onChange={handleChange} className="border rounded p-2 w-full" type="number" required />
    </div>
    <div>
      <label className="block font-medium">Color:</label>
      <input name="color" value={formData.color} onChange={handleChange} className="border rounded p-2 w-full" type="text" />
    </div>
    <div>
      <label className="block font-medium">Location:</label>
      <input name="location" value={formData.location} onChange={handleChange} className="border rounded p-2 w-full" type="text" required />
    </div>
    <div>
      <label className="block font-medium">Weight (kg):</label>
      <input name="weight" value={formData.weight} onChange={handleChange} className="border rounded p-2 w-full" type="number" />
    </div>
    <div>
      <label className="block font-medium">Dimensions (m):</label>
      <div className="flex space-x-2">
        <input name="dimensionLength" value={formData.dimensionLength} onChange={handleChange} className="border rounded p-2 w-full" type="number" placeholder="Length" />
        <input name="dimensionWidth" value={formData.dimensionWidth} onChange={handleChange} className="border rounded p-2 w-full" type="number" placeholder="Width" />
        <input name="dimensionHeight" value={formData.dimensionHeight} onChange={handleChange} className="border rounded p-2 w-full" type="number" placeholder="Height" />
      </div>
    </div>
    <div className="flex items-center">
      <input name="isAvailable" type="checkbox" checked={formData.isAvailable} onChange={handleChange} className="mr-2" />
      <label>Available for rent</label>
    </div>
    <div>
      <label className="block font-medium">Utilities (comma separated):</label>
      <input name="utilities" value={formData.utilities} onChange={handleChange} className="border rounded p-2 w-full" type="text" placeholder="e.g. Refrigerator, Solar Panel" />
    </div>
    <div className="md:col-span-2">
      <label className="block font-medium">Info (additional details):</label>
      <textarea name="info" value={formData.info} onChange={handleChange} className="border rounded p-2 w-full" rows="3" />
    </div>
  </div>
  </>
);

export default CamperFormFields;

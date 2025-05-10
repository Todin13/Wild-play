/*

UI to add a new van to db
Author: HERVET Thibaut

*/
import React, { useState } from "react";
import API from "../utils/api";
import CamperFormFields from "@/components/ui/CamperFormFields";

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
    dimensionLength: "",
    dimensionWidth: "",
    dimensionHeight: "",
    isAvailable: false,
    utilities: "",
    info: "",
  });
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

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
    const payload = {
      ...formData,
      price: Number(formData.price),
      seats: Number(formData.seats),
      beds: Number(formData.beds),
      baseRate: Number(formData.baseRate),
      weight: Number(formData.weight),
      dimension: [
        Number(formData.dimensionLength),
        Number(formData.dimensionWidth),
        Number(formData.dimensionHeight),
      ],
      utilities: formData.utilities 
        ? formData.utilities.split(",").map((u) => u.trim()) 
        : [],
    };
    delete payload.dimensionLength;
    delete payload.dimensionWidth;
    delete payload.dimensionHeight;

    try {
      const response = await API.post("/campers", payload);
      setSuccessMsg("Camper added successfully!");
      if (onAdded && response.data) {
        onAdded(response.data);
      }
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
      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg overflow-y-auto max-h-[80vh]"
      >
        {successMsg && <p className="text-green-600">{successMsg}</p>}
        {errorMsg && <p className="text-red-600">{errorMsg}</p>}

        <CamperFormFields formData={formData} handleChange={handleChange} />

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

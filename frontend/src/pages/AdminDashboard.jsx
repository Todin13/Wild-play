// src/pages/AdminPage.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import API from "@/utils/api";  // Axios instance with baseURL and auth
import CamperForm from "@/components/CamperForm";
import DealForm from "@/components/DealForm";
import MainLayout from "@/layouts/MainLayout"; // Assuming you have a MainLayout component

const AdminDashboard= () => {
  // Assume we have a way to get current user and check admin status (context or props)
  const currentUser = { isAdmin: true }; // <-- Replace with real auth context data
  if (!currentUser?.isAdmin) {
    // Not an admin: redirect to home (or login page) to prevent access
    return <Navigate to="/" replace />;
  }

  const [campers, setCampers] = useState([]);
  const [deals, setDeals] = useState([]);

  // Fetch existing campers and deals on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [camperRes, dealRes] = await Promise.all([
          API.get("/campers"),
          API.get("/deals"),
        ]);
        // Assuming the API returns data in shape: { campers: [...], deals: [...] }
        setCampers(camperRes.data.campers || []);
        setDeals(dealRes.data.deals || []);
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };
    fetchData();
  }, []);

  // Handler to delete a camper by ID
  const handleDeleteCamper = async (id) => {
    try {
      await API.delete(`/campers/${id}`);
      // Remove the deleted camper from state
      setCampers((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Delete camper failed:", err);
    }
  };

  // Handler to delete a deal by ID
  const handleDeleteDeal = async (id) => {
    try {
      await API.delete(`/deals/${id}`);
      // Remove the deleted deal from state
      setDeals((prev) => prev.filter((d) => d._id !== id));
    } catch (err) {
      console.error("Delete deal failed:", err);
    }
  };

  return (
    <MainLayout> 
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Section: Add New Camper */}
      <div className="mb-10 p-4 bg-white shadow rounded">
        <h2 className="text-xl font-semibold mb-4">Add New Camper</h2>
        <CamperForm 
          onAdded={(newCamper) => setCampers([...campers, newCamper])} 
        />
      </div>

      {/* Section: Existing Campers List */}
      <div className="mb-10 p-4 bg-white shadow rounded">
        <h2 className="text-xl font-semibold mb-4">Existing Campers</h2>
        <ul>
          {campers.map((camper) => (
            <li key={camper._id} className="flex justify-between py-2 border-b">
              <span>{camper.manufacturer} {camper.model}</span>
              <button
                onClick={() => handleDeleteCamper(camper._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Section: Add New Deal */}
      <div className="mb-10 p-4 bg-white shadow rounded">
        <h2 className="text-xl font-semibold mb-4">Add New Deal</h2>
        <DealForm 
          onAdded={(newDeal) => setDeals([...deals, newDeal])} 
        />
      </div>

      {/* Section: Existing Deals List */}
      <div className="mb-6 p-4 bg-white shadow rounded">
        <h2 className="text-xl font-semibold mb-4">Existing Deals</h2>
        <ul>
          {deals.map((deal) => (
            <li key={deal._id} className="flex justify-between py-2 border-b">
              <span>{deal.title} – {deal.location}</span>
              <button
                onClick={() => handleDeleteDeal(deal._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </MainLayout>
  );
};

export default AdminDashboard;

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

  // Add handlers passed to forms
  const handleAddCamper = (newCamper) => setCampers(prev => [...prev, newCamper]);
  const handleAddDeal = (newDeal) => setDeals(prev => [...prev, newDeal]);


  return (
    <MainLayout>
      <div className="p-6 space-y-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Campers Container */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-4">Campers</h2>
            <div className="flex gap-4">
              {/* List on left */}
              <div className="w-1/2 overflow-y-auto max-h-96 border-r pr-2">
                <ul className="space-y-2">
                  {campers.map(camper => (
                    <li key={camper._id} className="flex justify-between items-center">
                      <span>{camper.manufacturer} {camper.model}</span>
                      <button
                        onClick={() => handleDeleteCamper(camper._id)}
                        className="text-red-600 hover:underline"
                      >Delete</button>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Form on right */}
              <div className="w-1/2 pl-2">
                <CamperForm onAdded={handleAddCamper} />
              </div>
            </div>
          </div>

          {/* Deals Container */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-4">Deals</h2>
            <div className="flex gap-4">
              <div className="w-1/2 overflow-y-auto max-h-96 border-r pr-2">
                <ul className="space-y-2">
                  {deals.map(deal => (
                    <li key={deal._id} className="flex justify-between items-center">
                      <span>{deal.title} – {deal.location}</span>
                      <button
                        onClick={() => handleDeleteDeal(deal._id)}
                        className="text-red-600 hover:underline"
                      >Delete</button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-1/2 pl-2">
                <DealForm onAdded={handleAddDeal} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;

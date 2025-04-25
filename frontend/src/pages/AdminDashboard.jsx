import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import API from "@/utils/api";

import Sidebar from "@/components/Dashboard/Sidebar";
import Content from "@/components/Dashboard/Content";
import MainLayout from "@/layouts/MainLayout";

const AdminDashboard = () => {
  const currentUser = { isAdmin: true }; // Replace with real auth
  if (!currentUser?.isAdmin) {
    return <Navigate to="/profile" replace />;
  }

  const [campers, setCampers] = useState([]);
  const [deals, setDeals] = useState([]);
  const [section, setSection] = useState("Dashboard"); // Track selected section

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [camperRes, dealRes] = await Promise.all([
          API.get("/campers"),
          API.get("/deals"),
        ]);
        setCampers(camperRes.data.campers || []);
        setDeals(dealRes.data.deals || []);
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };
    fetchData();
  }, []);

  const handleDeleteCamper = async (id) => {
    try {
      await API.delete(`/campers/${id}`);
      setCampers((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Delete camper failed:", err);
    }
  };


  const handleAddCamper = (newCamper) => setCampers((prev) => [...prev, newCamper]);
  const handleAddDeal = (newDeal) => setDeals((prev) => [...prev, newDeal]);

  const handleSelect = (item) => {
    setSection(item); // Set selected section
  };

  return (
    <MainLayout>
      <div className="flex h-screen bg-gray-100">
      <Sidebar onSelect={handleSelect} />
        <Content
          section={section}
          campers={campers}
          onDeleteCamper={handleDeleteCamper}
          onAddCamper={handleAddCamper}
          onAddDeal={handleAddDeal}
        />
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;

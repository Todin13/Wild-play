/*

Admin Daashboard Page
Author: HERVET Thibaut

*/
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import Sidebar from "@/components/Dashboard/Sidebar";
import Content from "@/components/Dashboard/Content";
import MainLayout from "@/layouts/MainLayout";

const AdminDashboard = () => {
  const currentUser = { isAdmin: true }; // Replace with real auth
  if (!currentUser?.isAdmin) {
    return <Navigate to="/profile" replace />;
  }
  const [section, setSection] = useState("Dashboard"); // Track selected section

  const handleSelect = (item) => {
    setSection(item); // Set selected section
  };

  return (
    <MainLayout>
      <Sidebar onSelect={handleSelect} />
      <div className="flex h-screen ml-64 bg-gray-100">
        <Content section={section} />
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;

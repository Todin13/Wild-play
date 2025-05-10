/*

 main content of admin dashboard
Author: HERVET Thibaut

*/
import { useState } from "react";
import UserTable from "@/pages/user/UserTablePage";
import Title from "@/components/ui/Titles";
import DealsTable from "@/components/Dashboard/DealsTable";
import CampersTable from "@/components/Dashboard/CampersTable";
import CamperForm from "@/components/CamperForm";
import DealForm from "@/components/DealForm";

const Content = ({ section}) => {
  const [showCamperForm, setShowCamperForm] = useState(false);
  

    const renderContent = () => {
      switch (section) {
        case "Dashboard":
          return <p className="text-gray-600">Welcome to the Admin Dashboard.</p>;
        case "UserTable":
          return <UserTable />;
        case "Campers":
          return (
            <div className="flex gap-6">
              <div className="w-1/2">
                <CampersTable />
              </div>
              <div className="w-1/2">
                <CamperForm />
              </div>
            </div>
          );
        case "Deals":
          return(
          <div className="flex gap-6">
            <div className="w-1/2">
              <DealsTable />
            </div>
            <div className="w-1/2">
              <DealForm />
            </div>
          </div>)
      }
    };
  
    return (
      <div className="flex-1 p-6 bg-white overflow-y-auto h-screen">
        <Title
            variant="section"
            className="text-center mb-6 flex items-center justify-center gap-4 bg-white/80 backdrop-blur-md rounded-xl shadow-lg hover:shadow-xl p-3 text-deepgreen"
          >Manage {section}</Title>
        {renderContent()}
      </div>
    );
  };
  
  export default Content;
  
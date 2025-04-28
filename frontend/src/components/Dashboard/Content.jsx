import UserTable from "@/pages/user/UserTablePage";
import Title from "@/components/ui/Titles";
import DealsTable from "@/components/Dashboard/DealsTable";
import CampersTable from "@/components/Dashboard/CampersTable";

const Content = ({ section}) => {
    const renderContent = () => {
      switch (section) {
        case "Dashboard":
          return <p className="text-gray-600">Welcome to the Admin Dashboard.</p>;
        case "UserTable":
          return <UserTable />;
        case "Campers":
          return <CampersTable/>;
        case "Deals":
          return <DealsTable/>;
        case "Guides":
          return <p className="text-gray-600">Guides management coming soon!</p>;
        default:
          return null;
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
  
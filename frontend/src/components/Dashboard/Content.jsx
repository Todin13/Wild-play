import UserTable from "@/pages/user/UserTablePage";

const Content = ({ section, campers, deals, onDeleteCamper, onDeleteDeal }) => {
    const renderContent = () => {
      switch (section) {
        case "Dashboard":
          return <p className="text-gray-600">Welcome to the Admin Dashboard.</p>;
        case "UserTable":
          return <UserTable />;
        case "Campers":
          return (
            <div>
              <h3 className="text-xl font-semibold mb-4">Manage Campervans</h3>
              <ul className="space-y-3">
                {campers.map((c) => (
                  <li key={c._id} className="flex justify-between items-center bg-gray-100 p-4 rounded">
                    <span>{c.name} — {c.type}</span>
                    <button onClick={() => onDeleteCamper(c._id)} className="text-red-500 hover:underline">Delete</button>
                  </li>
                ))}
              </ul>
            </div>
          );
        case "Deals":
          return (
            <div>
              <h3 className="text-xl font-semibold mb-4">Manage Deals</h3>
              <ul className="space-y-3">
                {deals.map((d) => (
                  <li key={d._id} className="flex justify-between items-center bg-gray-100 p-4 rounded">
                    <span>{d.title} — {d.discount}%</span>
                    <button onClick={() => onDeleteDeal(d._id)} className="text-red-500 hover:underline">Delete</button>
                  </li>
                ))}
              </ul>
            </div>
          );
        case "Trips":
          return <p className="text-gray-600">Trips management coming soon!</p>;
        case "Guides":
          return <p className="text-gray-600">Guides management coming soon!</p>;
        default:
          return null;
      }
    };
  
    return (
      <div className="flex-1 p-6 bg-white overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">{section}</h2>
        {renderContent()}
      </div>
    );
  };
  
  export default Content;
  
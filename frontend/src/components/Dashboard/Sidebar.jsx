import "@/assets/styles/sidebar.css"; 

const Sidebar = ({ onSelect }) => {
  const menuItems = ["UserTable", "Campers", "Deals", "Guides"];

  return (
    <aside className="sidebar">
      
      {/* Title */}
      <div className="sidebar-title">
        Dashboard
      </div>

      {/* Menu */}
      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <button
            key={item}
            onClick={() => onSelect(item)}
            className="sidebar-menu-item"
          >
            {item}
          </button>
        ))}
      </nav>

      {/* Footer if needed */}
      <div className="sidebar-footer">
        {/* Example: Settings, logout, or version */}
      </div>
      
    </aside>
  );
};

export default Sidebar;

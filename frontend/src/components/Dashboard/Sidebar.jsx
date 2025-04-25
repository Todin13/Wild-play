

const Sidebar = ({ onSelect }) => {
  const menuItems = ["UserTable", "Campers", "Deals", "Guides"];

  return (
    <aside className="w-64 shadow-md p-4  border bg-white/80 backdrop-blur-md ">
      
      <nav>
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li key={item}>
              <button
                onClick={() => onSelect(item)}
                className="text-left w-full text-gray-700 hover:text-green-600 font-medium transition"
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

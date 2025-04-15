import { Link } from "react-router-dom";
import { MagnifyingGlassIcon, Bars3Icon } from "@heroicons/react/24/outline"; // Heroicons v2
import "@/assets/styles/navbar.css"; // Import the CSS file
import { useState } from "react"; // Import React hooks

const TopBar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false); // Track whether the nav menu is open

  // Toggle navigation menu visibility
  const toggleNav = () => {
    setIsNavOpen((prevState) => !prevState);
  };

  return (
    <header className="topbar">
      {/* Left: Logo + Nav */}
      <div className="topbar-left">
        <h1 className="text-xl font-bold text-gray-800">Wild Play</h1>

        {/* Hamburger Menu (Visible on mobile) */}
        <div className="topbar-hamburger" onClick={toggleNav}>
          <Bars3Icon className="h-6 w-6 text-gray-600" />
        </div>

        {/* Nav Links */}
        <nav className={`topbar-nav ${isNavOpen ? "show" : ""}`}>
          <Link to="/" className="topbar-button">
            Home
          </Link>
          <Link to="/guide" className="topbar-button">
            Travel Guide
          </Link>
        </nav>
      </div>

      {/* Right: Search + Login */}
      <div className="topbar-right">
        {/* Mini Search Bar with Magnifying Glass Icon */}
        <div className="topbar-search">
          <input
            type="text"
            placeholder="Search..."
            className="w-40" // Controls the width of the search input
          />
          <button className="topbar-search-button">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Login Link */}
        <Link to="/login" className="topbar-button">
          Login
        </Link>
      </div>
    </header>
  );
};

export default TopBar;

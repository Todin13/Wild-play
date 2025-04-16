import { Link } from "react-router-dom";
import { MagnifyingGlassIcon, Bars3Icon } from "@heroicons/react/24/outline";
import "@/assets/styles/navbar.css";
import { useState } from "react";

const TopBar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  return (
    <header className="topbar">
      {/* Left: Logo only */}
      <div className="topbar-left">
        <h1 className="text-xl font-bold text-gray-800">Wild Play</h1>

        {/* Desktop nav */}
        <nav className="topbar-nav desktop-only">
          <Link to="/" className="topbar-button">
            Home
          </Link>
          <Link to="/guide" className="topbar-button">
            Travel Guide
          </Link>
        </nav>
      </div>

      {/* Right: Desktop search/login, Mobile hamburger */}
      <div className="topbar-right-container">
        {/* Desktop-only */}
        <div className="topbar-right desktop-only">
          <div className="topbar-search">
            <input type="text" placeholder="Search..." className="w-40" />
            <button className="topbar-search-button">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          <Link to="/login" className="topbar-button">
            Login
          </Link>
        </div>

        {/* Mobile hamburger (only visible on small screens) */}
        <div className="topbar-hamburger mobile-only" onClick={toggleNav}>
          <Bars3Icon className="h-6 w-6 text-gray-600" />
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isNavOpen && (
        <div className="topbar-mobile-menu mobile-only">
          <nav className="topbar-nav">
            <Link to="/" className="topbar-button">
              Home
            </Link>
            <Link to="/guide" className="topbar-button">
              Travel Guide
            </Link>
          </nav>
          <div className="topbar-right">
            <div className="topbar-search">
              <input type="text" placeholder="Search..." className="w-full" />
              <button className="topbar-search-button">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            <Link to="/login" className="topbar-button w-full text-center">
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default TopBar;

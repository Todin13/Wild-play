import { Link } from "react-router-dom";
import { MagnifyingGlassIcon, Bars3Icon } from "@heroicons/react/24/outline";
import "@/assets/styles/navbar.css";
import { useState } from "react";
import { useUserDashboard } from "@/hooks/UserHooks";

const TopBar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { isLoggedIn, user, loading } = useUserDashboard();

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
          <Link to="/bookings/campers" className="topbar-button">
              Vans
            </Link>
          <Link to="/guide" className="topbar-button">
            Travel Guide
          </Link>
          <Link to="/campervans" className="topbar-button">
              Campervans
          </Link>
          <Link to="/deals" className="topbar-button">
            Deals
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
              <MagnifyingGlassIcon className="h-5 w-5 text-navBarText" />
            </button>
          </div>
          {!loading && (
            isLoggedIn ? (
              <>
                <Link to="/profile" className="topbar-button">
                  <button>{user.detail.username}</button>
                </Link>
              </>
            ) : (
              <Link to="/login" className="topbar-button">
                Login
              </Link>
            )
          )}
        </div>

        {/* Mobile hamburger (only visible on small screens) */}
        <div className="topbar-hamburger mobile-only" onClick={toggleNav}>
          <Bars3Icon className="h-6 w-6 text-navBarText" />
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isNavOpen && (
        <div className="topbar-mobile-menu mobile-only">
          <nav className="topbar-nav">
          {!loading && (
            isLoggedIn ? (
              <>
                <Link to="/profile" className="topbar-button text-center">
                  <button>{user.detail.username}</button>
                </Link>
              </>
            ) : (
              <Link to="/login" className="topbar-button text-center">
                Login
              </Link>
            )
          )}
            <Link to="/" className="topbar-button">
              Home
            </Link>
            <Link to="/bookings/campers" className="topbar-button">
              Vans
            </Link>
            <Link to="/guide" className="topbar-button">
              Travel Guide
            </Link>
            <Link to="/campervans" className="topbar-button">
              Campervans
            </Link>
            <Link to="/deals" className="topbar-button">
              Deals
            </Link>
          </nav>
          <div className="topbar-search">
            <input type="text" placeholder="Search..." />
            <button className="topbar-search-button">
              <MagnifyingGlassIcon className="h-5 w-5 text-navBarText" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default TopBar;

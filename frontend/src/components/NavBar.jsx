// TopBar.jsx
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <header>
      <h1>Wild Play</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </header>
  );
};

export default NavBar;

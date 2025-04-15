import { Link } from "react-router-dom";
import { FaInstagram, FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa"; // Import social media icons from react-icons
import "@/assets/styles/footer.css"; // Import the CSS file for footer styles

const Footer = () => {
  return (
    <footer className="footer">
      {/* Footer Social Media Icons */}
      <div className="footer-social">
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="social-icon" />
        </a>
        <a
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter className="social-icon" />
        </a>
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook className="social-icon" />
        </a>
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="social-icon" />
        </a>
      </div>

      {/* Footer Links */}
      <div className="footer-links">
        <Link to="/contact" className="footer-button">
          Contact Us
        </Link>
        <Link to="/about" className="footer-button">
          About Us
        </Link>
        <Link to="/team" className="footer-button">
          Team
        </Link>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Wild-Play. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

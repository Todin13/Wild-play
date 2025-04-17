import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";
import "@/assets/styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <svg viewBox="0 0 120 28" className="w-full overflow-visible">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="
                1 0 0 0 0  
                0 1 0 0 0  
                0 0 1 0 0  
                0 0 0 13 -9"
              result="goo"
            />
            <xfeBlend in="SourceGraphic" in2="goo" />
          </filter>
          <path
            id="wave"
            d="M 0,10 C 30,10 30,15 60,15 90,15 90,10 120,10 150,10 150,15 180,15 210,15 210,10 240,10 v 28 h -240 z"
          />
        </defs>

        <use
          id="wave3"
          className="wave fill-wave"
          xlinkHref="#wave"
          x="0"
          y="-2"
        />
        <use
          id="wave2"
          className="wave fill-wave"
          xlinkHref="#wave"
          x="0"
          y="0"
        />
        <use
          id="wave1"
          className="wave fill-wave"
          xlinkHref="#wave"
          x="0"
          y="1"
        />
      </svg>

      <div className="footer-content">
        <div className="footer-social">
          <a
            href="https://www.instagram.com"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="social-icon" />
          </a>
          <a
            href="https://www.twitter.com"
            aria-label="Twitter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="social-icon" />
          </a>
          <a
            href="https://www.facebook.com"
            aria-label="Facebook"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="social-icon" />
          </a>
          <a
            href="https://www.linkedin.com"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="social-icon" />
          </a>
        </div>

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

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} Wild-Play. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="hero_area">
      <header className="header_section">
        <div className="header_top">
          <div className="container-fluid">
            <div className="contact_nav">
              <Link to="/" className="">
                <FaPhoneAlt className="contact_nav-icon" />
                <span className="contact_nav-text">
                  Call : +01 123455678990
                </span>
              </Link>
              <Link to="/">
                <FaEnvelope className="contact_nav-icon" />
                <span className="contact_nav-text">Email : demo@gmail.com</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="header_bottom">
          <div className="container-fluid">
            <nav className="navbar navbar-expand-lg custom_nav-container">
              <Link to="/" className="navbar-brand">
                <span>Inance</span>
              </Link>

              <button
                class="navbar-toggler"
                type="button"
                aria-controls="navbarNav"
                aria-expanded={isOpen}
                aria-label="Toggle navigation"
                onClick={toggleNavbar}
              >
                <span class="navbar-toggler-icon"> </span>
              </button>

              <div
                className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
                id="navbarNav"
              >
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link to="/" className="nav-link">
                      Home <span className="visually-hidden">(current)</span>
                    </Link>
                  </li>
                  <li className="nav-item active">
                    <Link to="/about" className="nav-link">
                      About
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/service" className="nav-link">
                      Services
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/contact" className="nav-link">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;

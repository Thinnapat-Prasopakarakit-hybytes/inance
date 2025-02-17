import React, { useState, useContext } from "react";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./Header.scss";
import { useIntl } from "react-intl";
import { LanguageContext } from "../../i18n/LanguageProvider";

const Header = () => {
  const { messages, locale } = useIntl();
  const { handleLanguageChange } = useContext(LanguageContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header_section">
      <div className="header_top">
        <div className="container-fluid">
          <div className="contact_nav">
            <NavLink to={`/${locale}/`}>
              <FaPhoneAlt className="contact_nav-icon" />
              <span className="contact_nav-text keep-ltr">
                {messages.header.phone}
              </span>
            </NavLink>

            <div className="language">
              <span
                className={locale === "en" ? "active" : "toggle"}
                onClick={() => locale !== "en" && handleLanguageChange("en")}
              >
                English
              </span>
              <span className="separator">{" | "}</span>
              <span
                className={locale === "ar" ? "active" : "toggle"}
                onClick={() => locale !== "ar" && handleLanguageChange("ar")}
              >
                عربي
              </span>
            </div>

            <NavLink to={`/${locale}/`}>
              <FaEnvelope className="contact_nav-icon" />
              <span className="contact_nav-text">{messages.header.email}</span>
            </NavLink>
          </div>
        </div>
      </div>
      <div className="header_bottom">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg custom_nav-container">
            <NavLink to={`/${locale}`} className="navbar-brand">
              <span>Inance</span>
            </NavLink>

            <button
              className="navbar-toggler"
              type="button"
              aria-controls="navbarNav"
              aria-expanded={isOpen}
              aria-label="Toggle navigation"
              onClick={toggleNavbar}
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
              data-testid="navbar-collapse"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink
                    to={`/${locale}`}
                    className={({ isActive }) =>
                      `nav-link${isActive ? " active" : ""}`
                    }
                    end
                  >
                    {messages.nav.home}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={`/${locale}/about`}
                    className={({ isActive }) =>
                      `nav-link${isActive ? " active" : ""}`
                    }
                  >
                    {messages.nav.about}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={`/${locale}/service`}
                    className={({ isActive }) =>
                      `nav-link${isActive ? " active" : ""}`
                    }
                  >
                    {messages.nav.services}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={`/${locale}/contact`}
                    className={({ isActive }) =>
                      `nav-link${isActive ? " active" : ""}`
                    }
                  >
                    {messages.nav.contact}
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

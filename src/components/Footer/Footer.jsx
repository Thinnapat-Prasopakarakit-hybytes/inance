import React from "react";
import { useIntl } from "react-intl";
import "./Footer.scss";

const Footer = () => {
  const { messages } = useIntl();

  return (
    <footer className="footer_section">
      <div className="container">
        <p>
          &copy; <span>{new Date().getFullYear()}</span>{" "}
          <a href="https://html.design/">
            {messages.footer.copyright} {messages.footer.company}
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

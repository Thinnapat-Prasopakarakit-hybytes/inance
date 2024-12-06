import React from "react";
import "./Footer.scss";
const Footer = () => {
  return (
    <footer class="footer_section">
      <div class="container">
        <p>
          &copy; <span>{new Date().getFullYear()}</span> All Rights Reserved By
          <a href="https://html.design/">Free Html Templates</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

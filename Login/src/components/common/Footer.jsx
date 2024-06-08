import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

import "./styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="social-media">
          <a href="https://www.facebook.com"><FaFacebook /></a>
          <a href="https://twitter.com"><FaTwitter /></a>
          <a href="https://www.instagram.com/def__satvik/"><FaInstagram /></a>
        </div>

        <div className="footer-credits">
          <p className="footer-credits-text">
            &copy; 2023 Satvik All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

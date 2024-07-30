import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

function Footer() {
  return (
    <div className="my-6 px-4">
      <h2 className="text-gray-400 text-center text-sm md:text-base">
        AdvenTour - Created by MD SALMAN NASIR
      </h2>
      <div className="flex justify-center space-x-4 mt-4">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <span className="text-gray-600 hover:text-blue-600 transition duration-200">
            <FaFacebookF />
          </span>
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
        >
          <span className="text-gray-600 hover:text-blue-400 transition duration-200">
            <FaTwitter />
          </span>
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <span className="text-gray-600 hover:text-pink-600 transition duration-200">
            <FaInstagram />
          </span>
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <span className="text-gray-600 hover:text-blue-800 transition duration-200">
            <FaLinkedinIn />
          </span>
        </a>
      </div>
    </div>
  );
}

export default Footer;

// src/components/Footer.jsx

import React from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaXTwitter } from "react-icons/fa6";



export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#000",
        color: "#f4c04c",
        padding: "40px 20px",
        marginTop: "100px",
        borderTop: "1px solid #333",
        boxShadow: "0 -2px 12px rgba(244, 192, 76, 0.15)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "20px",
        }}
      >
        <img
          src="/public/logo.png"
          alt="SwiftRide Logo"
          style={{
            width: "140px",
          }}
        />

        <ul
          style={{
            listStyle: "none",
            display: "flex",
            gap: "24px",
            padding: 0,
            margin: 0,
            fontWeight: "500",
            fontSize: "15px",
          }}
        >
          <li><a href="/" style={{ color: "#ccc", textDecoration: "none" }}>Home</a></li>
          <li><a href="/cars" style={{ color: "#ccc", textDecoration: "none" }}>Cars</a></li>
          <li><a href="/about" style={{ color: "#ccc", textDecoration: "none" }}>About</a></li>
          <li><a href="/contact" style={{ color: "#ccc", textDecoration: "none" }}>Contact</a></li>
        </ul>

        <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
          <a href="#" className="social-link" > <FaFacebookF /> </a>
          <a href="#" className="social-link"  > <FaInstagram /> </a>
          <a href="#" className="social-link"  > <FaXTwitter /> </a>
          <a href="#"className="social-link"   > <FaWhatsapp /> </a>
        </div>

        <p style={{ fontSize: "14px", color: "#888", marginTop: "20px" }}>
          &copy; {new Date().getFullYear()} SwiftRide. All rights reserved.
        </p>
      </div>
    </footer>
  );
};


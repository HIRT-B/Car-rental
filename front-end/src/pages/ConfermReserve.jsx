import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ConfermReserve() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const parsedUser = JSON.parse(stored);
      if (parsedUser?.fullname) {
        // Respectful title without gender detection
        setUser(`Mr./Ms. ${parsedUser.fullname}`);
      }
    }
  }, []);

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center py-5 px-3"
      style={{ backgroundColor: "#e0dbd2" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="p-4 w-100"
        style={{
          maxWidth: "500px",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          border: "1px solid #eee",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          boxShadow: `
            0 20px 50px rgba(0, 0, 0, 0.3),
            0 0 30px rgba(244, 192, 76, 0.2),
            0 0 60px rgba(244, 192, 76, 0.15)
          `,
        }}
      >
        {/* Icon with glow */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-3"
          style={{
            filter: "drop-shadow(0 0 10px #f4c04c)",
          }}
        >
          <FaCheckCircle size={70} color="#f4c04c" />
        </motion.div>

        <h2 className="fw-bold mb-3" style={{ color: "#333" }}>
          Thank you for your reservation{user ? `, ${user}` : ""}!
        </h2>

        <p style={{ color: "#777", fontSize: "15px" }}>
          We have received your request. A confirmation email has been sent to you.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn mt-4"
          style={{
            backgroundColor: "#f4c04c",
            color: "#000",
            fontWeight: "600",
            borderRadius: "25px",
            padding: "10px 30px",
            fontSize: "15px",
            border: "none",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            transition: "all 0.3s ease",
          }}
          onClick={() => (window.location.href = "all-cars")}
        >
          Book another car
        </motion.button>
      </motion.div>
    </div>
  );
}

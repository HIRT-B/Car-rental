import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserPlus, FaUser, FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaLock } from "react-icons/fa";

export default function Register({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/auth/register", {
        fullname,
        email,
        address,
        password,
        phone,
      })
      .then((res) => {
        setUser(res.data);
        if (res.data.role === "admin") navigate("/admin");
        else navigate("/");
      })
      .catch((err) => {
        console.error("Registration failed:", err.response?.data || err.message);
        alert("Registration failed, please try again.");
      });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#000", marginTop: "-6rem" }}
    >
      <div className="login-logo position-absolute top-0 start-0 mt-3 ms-3">
        <img
          src="/logo.png"
          alt="SwiftRide Logo"
          style={{ width: "100px", height: "100px", objectFit: "contain" }}
        />
      </div>

      <div
        className="login-box"
        style={{
          backgroundColor: "#000",
          borderRadius: "25px",
          boxShadow: "0 0 20px rgba(244, 192, 76, 0.7)",
          width: "500px",
          padding: "3rem",
          maxWidth: "95vw",
          color: "#eee",
        }}
      >
        <div className="d-flex align-items-center mb-4">
          <FaUserPlus className="me-3" style={{ fontSize: "30px", color: "#f4c04c" }} />
          <h2 className="text-gold glow m-0" style={{ fontSize: "2rem" }}>
            Create an Account
          </h2>
        </div>

        <form onSubmit={handleRegister}>
          {/* Fullname */}
          <div className="mb-4 position-relative">
            <label className="form-label text-light">Full Name</label>
            <FaUser
              style={{
                position: "absolute",
                left: "14px",
                top: "44px",
                color: "#f4c04c",
                pointerEvents: "none",
              }}
            />
            <input
              type="text"
              className="form-control ps-5"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="Enter your full name"
              required
              style={{
                backgroundColor: "#111",
                borderColor: "#444",
                color: "#eee",
                height: "50px",
                fontSize: "1rem",
                borderRadius: "12px",
              }}
            />
          </div>

          {/* Phone */}
          <div className="mb-4 position-relative">
            <label className="form-label text-light">Phone</label>
            <FaPhoneAlt
              style={{
                position: "absolute",
                left: "14px",
                top: "44px",
                color: "#f4c04c",
                pointerEvents: "none",
              }}
            />
            <input
              type="text"
              className="form-control ps-5"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +212 600 000 000"
              required
              style={{
                backgroundColor: "#111",
                borderColor: "#444",
                color: "#eee",
                height: "50px",
                fontSize: "1rem",
                borderRadius: "12px",
              }}
            />
          </div>

          {/* Address */}
          <div className="mb-4 position-relative">
            <label className="form-label text-light">Address</label>
            <FaMapMarkerAlt
              style={{
                position: "absolute",
                left: "14px",
                top: "44px",
                color: "#f4c04c",
                pointerEvents: "none",
              }}
            />
            <input
              type="text"
              className="form-control ps-5"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              required
              style={{
                backgroundColor: "#111",
                borderColor: "#444",
                color: "#eee",
                height: "50px",
                fontSize: "1rem",
                borderRadius: "12px",
              }}
            />
          </div>

          {/* Email */}
          <div className="mb-4 position-relative">
            <label className="form-label text-light">Email address</label>
            <FaEnvelope
              style={{
                position: "absolute",
                left: "14px",
                top: "44px",
                color: "#f4c04c",
                pointerEvents: "none",
              }}
            />
            <input
              type="email"
              className="form-control ps-5"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              style={{
                backgroundColor: "#111",
                borderColor: "#444",
                color: "#eee",
                height: "50px",
                fontSize: "1rem",
                borderRadius: "12px",
              }}
            />
          </div>

          {/* Password */}
          <div className="mb-4 position-relative">
            <label className="form-label text-light">Password</label>
            <FaLock
              style={{
                position: "absolute",
                left: "14px",
                top: "44px",
                color: "#f4c04c",
                pointerEvents: "none",
              }}
            />
            <input
              type="password"
              className="form-control ps-5"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                backgroundColor: "#111",
                borderColor: "#444",
                color: "#eee",
                height: "50px",
                fontSize: "1rem",
                borderRadius: "12px",
              }}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: "#000",
              color: "#f4c04c",
              fontWeight: "600",
              fontSize: "1.2rem",
              borderRadius: "30px",
              padding: "13px 0",
              boxShadow: "0 0 8px rgba(244, 192, 76, 0.3)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 0 15px rgba(244, 192, 76, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 0 8px rgba(244, 192, 76, 0.3)";
            }}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

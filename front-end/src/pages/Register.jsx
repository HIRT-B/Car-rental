import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";

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
    <div className="home d-flex justify-content-center" style={{ minHeight: "100vh" }}>

      <div className="login-logo position-absolute top-0 start-0 mt-3 ms-3">
        <img
          src="/logo.png"
          alt="SwiftRide Logo"
          style={{ width: "100px", height: "100px", objectFit: "contain" }}
        />
      </div>
      <div className="login-box p-4" style={{ marginTop: "100px" }}>

        <div className="d-flex align-items-center mb-4">
          <FaUserPlus className="ms-2 text-gold" style={{ fontSize: "28px", marginBottom: "5px" , marginRight:"8px"}} />
          <h2 className="text-gold glow m-0" style={{ fontSize: "1.8rem" }}>
            Create an Account
          </h2>
        </div>

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label text-light">Full Name</label>
            <input
              type="text"
              className="form-control custom-input"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
              placeholder="Enter your full name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-light">Phone</label>
            <input
              type="text"
              className="form-control custom-input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="e.g. +212 600 000 000"
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-light">Address</label>
            <input
              type="text"
              className="form-control custom-input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              placeholder="Enter your address"
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-light">Email address</label>
            <input
              type="email"
              className="form-control custom-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label className="form-label text-light">Password</label>
            <input
              type="password"
              className="form-control custom-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="btn text-white custom-btn w-100" style={{ backgroundColor: "#000" }}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

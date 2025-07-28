import axios from "axios";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaUserLock } from "react-icons/fa";



export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/auth/login", { email, password })
      .then((res) => {
        setUser(res.data);
        const user = res.data;

        localStorage.setItem(
          "user",
          JSON.stringify({
            id: user.id,
            fullname: user.fullname,
            email: user.email,
            role: user.role,
          })
        );

        const redirectTo = location.state?.from || "/";
        const carId = location.state?.carId;

        if (redirectTo === "/book" && carId) {
          navigate(redirectTo, { state: { carId } });
        } else if (user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.error("Login failed:", err.response?.data || err.message);
        alert("Email ou mot de passe incorrect");
      });
  };

  return (
    <div className="home d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="login-logo position-absolute top-0 start-0 mt-3 ms-3">
        <img
          src="/logo.png"
          alt="SwiftRide Logo"
          style={{ width: "100px", height: "100px", objectFit: "contain" }}
        
        />
      </div>
      <div className="login-box p-4 ">
        <div className="d-flex align-items-center mb-4">
          <FaUserLock className="me-2 text-gold" style={{ fontSize: "28px" }} />
          <h2 className="text-gold glow m-0" style={{ fontSize: "1.8rem" }}>
            Login to Your Account
          </h2>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label text-light">Email address</label>
            <input
              type="email"
              className="form-control custom-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label text-light">Password</label>
            <input
              type="password"
              className="form-control custom-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" className="btn text-white custom-btn w-100" style={{ backgroundColor: "#000" }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

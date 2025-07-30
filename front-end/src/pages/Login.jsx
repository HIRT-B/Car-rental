import axios from "axios";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaUserLock, FaEnvelope, FaLock } from "react-icons/fa";

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
    <div
      className=" d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#000", marginTop:"-6rem" }}
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
          <FaUserLock className="me-3" style={{ fontSize: "30px", color: "#f4c04c" }} />
          <h2 className="text-gold glow m-0" style={{ fontSize: "2rem" }}>
            Login to Your Account
          </h2>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-4 position-relative">
            <label className="form-label text-light" htmlFor="emailInput" style={{ fontSize: "1.1rem" }}>
              Email address
            </label>
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
              id="emailInput"
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

          <div className="mb-4 position-relative">
            <label className="form-label text-light" htmlFor="passwordInput" style={{ fontSize: "1.1rem" }}>
              Password
            </label>
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
              id="passwordInput"
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

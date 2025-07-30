import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserAccount() {
  const [user, setUser] = useState(null);
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    if (!storedUser?.id) return;

    const userId = storedUser.id;

    const fetchUser = axios.get(`http://localhost:3000/user/users/${userId}`);
    const fetchStats = axios.get(`http://localhost:3000/user/users/details`);

    Promise.all([fetchUser, fetchStats])
      .then(([userRes, statsRes]) => {
        setUser(userRes.data);
        const statsForUser = statsRes.data.find(stat => stat.user_id === userId);
        setUserStats(statsForUser);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 text-light">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center text-warning mt-5">
        User data not found. Please login again.
      </div>
    );
  }

  return (
    <div className="container py-5 text-light" style={{ backgroundColor: "#121212", minHeight: "100vh", borderRadius:"40px" }}>
      <div className="mb-4 d-flex justify-content-between align-items-center flex-wrap gap-3">
        <div>
          <h1 style={{color:"#f4c04c"}}>Welcome, {user.fullname}!</h1>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>Role: {user.role}</p>
          <p>
            Status:{" "}
            <span className={`status-glow ${user.status === "active" ? "active" : "inactive"}`}>
              {user.status}
            </span>
          </p>
        </div>

        <button
          className="btn btn-outline-gold shadow-custom"
          onClick={() => navigate("/user/user-settings")}
        >
          Edit Profile
        </button>
      </div>

      <div className="card rounded-4 shadow p-4 border border-warning-subtle mt-4" style={{backgroundColor:"#000"}}>
        <h4 className=" mb-4" style={{color:"#f4c04c"}}>Your Summary</h4>
        {userStats ? (
          <div className="row g-4">
            {/* Rentals */}
            <div className="col-md-4">
              <div className="summary-card text-center p-4 rounded-4 h-100">
                <h2 className="text-gold fw-bold mb-2">{userStats.rentalCount}</h2>
                <p className="text-secondary mb-0">Total Rentals</p>
              </div>
            </div>

            {/* Last Rental Date */}
            <div className="col-md-4">
              <div className="summary-card text-center p-4 rounded-4 h-100">
                <h2 className="text-gold fw-bold mb-2">
                  {userStats.lastRentalDate ? new Date(userStats.lastRentalDate).toLocaleDateString() : "N/A"}
                </h2>
                <p className="text-secondary mb-0">Last Rental</p>
              </div>
            </div>

            {/* Total Spent */}
            <div className="col-md-4">
              <div className="summary-card text-center p-4 rounded-4 h-100">
                <h2 className="text-gold fw-bold mb-2">${userStats.totalSpent}</h2>
                <p className="text-secondary mb-0">Total Spent</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-muted">No statistics available.</p>
        )}
      </div>

      {/* Styles */}
      <style>{`
        .text-gold {
          color: #f4c04c;
        }

        .summary-card {
          background: linear-gradient(145deg, #1a1a1a, #101010);
          border: 1px solid rgba(255, 215, 0, 0.1);
          box-shadow: 0 0 8px rgba(244, 192, 76, 0.15);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .summary-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 0 16px rgba(244, 192, 76, 0.4);
        }

        .status-glow {
          display: inline-block;
          padding: 6px 16px;
          border-radius: 30px;
          font-weight: bold;
          text-transform: capitalize;
          box-shadow: 0 0 8px rgba(0, 255, 128, 0.3);
          animation: pulse 1.5s infinite;
          font-size: 14px;
        }

        .status-glow.active {
          background-color: transparent;
          color: #00ff99;
          border: 1px solid #00ff99;
        }

        .status-glow.inactive {
          background-color: transparent;
          color: #aaa;
          border: 1px solid #666;
          box-shadow: none;
          animation: none;
        }

        @keyframes pulse {
          0% { box-shadow: 0 0 6px rgba(0, 255, 128, 0.3); }
          50% { box-shadow: 0 0 14px rgba(0, 255, 128, 0.7); }
          100% { box-shadow: 0 0 6px rgba(0, 255, 128, 0.3); }
        }

        .btn-outline-gold {
          color: #f4c04c;
          border: 1px solid #f4c04c;
          background: #000;
          padding: 10px 24px;
          border-radius: 30px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .btn-outline-gold:hover {
          background-color: #f4c04c;
          color: #000;
        }

        .shadow-custom {
          box-shadow: 0 0 12px rgba(244, 192, 76, 0.4);
        }
      `}</style>
    </div>
  );
}

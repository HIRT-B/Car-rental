import React, { useEffect, useState } from "react";
import WeeklyStats from "../components/WeeklyStats";
import { FaChartLine, FaCarAlt, FaFileInvoice, FaUserFriends } from "react-icons/fa";
import axios from "axios";

export default function Dashboard() {
    const [totalCars, setTotalCars] = useState(0);
    const [todayRentals, setTodayRentals] = useState(0);
    const [usersCount, setUsersCount] = useState(0);
    const [recentRentals, setRecentRentals] = useState([]);

    // Function to fetch all stats
    const fetchStats = () => {
        axios.get("http://localhost:3000/car/cars")
            .then(res => setTotalCars(res.data.length))
            .catch(err => console.error("Error fetching cars:", err));

        axios.get("http://localhost:3000/rental/rentals/today")
            .then(res => setTodayRentals(res.data.todayCount))
            .catch(err => console.error("Error fetching today's rentals:", err));

        axios.get("http://localhost:3000/user/users")
            .then(res => setUsersCount(res.data.length))
            .catch(err => console.error("Error fetching users:", err));

        axios.get("http://localhost:3000/rental/rentals/details")
            .then(res => setRecentRentals(res.data.slice(0, 5)))
            .catch(err => console.error("Error fetching recent rentals:", err));
    };

    useEffect(() => {
        fetchStats(); // Fetch at first load

        const interval = setInterval(fetchStats, 10000); // Refresh every 10 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <div className="dashboard-wrapper">
            <h2 className="dashboard-title page-enter delay-1">
                Admin Dashboard
                <FaChartLine className="dashboard-icon-glow" style={{ marginLeft: "9px", marginTop: "-9px" }} />
            </h2>

            <div className="cards-grid page-enter delay-2">
                <div className="info-card">
                    <div className="icon-glow"><FaCarAlt size={28} /></div>
                    <h5>Total Cars</h5>
                    <p>{totalCars}</p>
                </div>

                <div className="info-card">
                    <div className="icon-glow"><FaFileInvoice size={28} /></div>
                    <h5>Today's Rentals</h5>
                    <p>{todayRentals}</p>
                </div>

                <div className="info-card">
                    <div className="icon-glow"><FaUserFriends size={28} /></div>
                    <h5>Users</h5>
                    <p>{usersCount}</p>
                </div>
            </div>

            <div className="chart-section page-enter delay-3">
                <h4>Weekly Statistics</h4>
                <div className="chart-placeholder">
                    <WeeklyStats />
                </div>
            </div>

            <div className="table-section page-enter delay-4">
                <h4 className="section-title">Recent Rentals</h4>
                <div className="table-wrapper">
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>Customer</th>
                                <th>Car</th>
                                <th>Rental Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentRentals.map((rental) => (
                                <tr key={rental.rental_id}>
                                    <td>{rental.customer_name}</td>
                                    <td>{rental.vehicle_brand} {rental.vehicle_model}</td>
                                    <td>{rental.rental_date.split("T")[0]}</td>
                                    <td>
                                        <span className={`badge ${rental.status.toLowerCase().replace(" ", "-")}`}>
                                            {rental.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

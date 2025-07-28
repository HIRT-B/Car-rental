import React from "react";
import WeeklyStats from "../components/WeeklyStats"
import { FaChartLine } from "react-icons/fa";
import { FaCarAlt, FaFileInvoice, FaUserFriends } from "react-icons/fa";


export default function Dashboard() {
    return (
        <div className="dashboard-wrapper  ">
            <h2 className="dashboard-title page-enter delay-1">
                Admin Dashboard
                <FaChartLine className="dashboard-icon-glow" style={{ marginLeft: "9px", marginTop: "-9px" }} />

            </h2>

            <div className="cards-grid page-enter delay-2">
                <div className="info-card">
                    <div className="icon-glow">
                        <FaCarAlt size={28} />
                    </div>
                    <h5>Total Cars</h5>
                    <p>150</p>
                </div>

                <div className="info-card">
                    <div className="icon-glow">
                        <FaFileInvoice size={28} />
                    </div>
                    <h5>Today's Rentals</h5>
                    <p>26</p>
                </div>

                <div className="info-card">
                    <div className="icon-glow">
                        <FaUserFriends size={28} />
                    </div>
                    <h5>Users</h5>
                    <p>89</p>
                </div>
            </div>


            <div className="chart-section page-enter delay-3">
                <h4>Weekly Statistics</h4>
                <div className="chart-placeholder"><WeeklyStats /></div>
            </div>

            <div className="table-section page-enter delay-4">
                <h4 className="section-title">Recent Rentals</h4>
                <div className="table-wrapper">
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>Customer</th>
                                <th>Car</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Yassine</td>
                                <td>Hyundai i20</td>
                                <td>2025-07-23</td>
                                <td><span className="badge active">Active</span></td>
                            </tr>
                            <tr>
                                <td>Khaoula</td>
                                <td>Audi A4</td>
                                <td>2025-07-21</td>
                                <td><span className="badge ended">Ended</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}

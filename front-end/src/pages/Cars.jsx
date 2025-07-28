import { NavLink } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import CardProduct from "../components/CardProduct";
import StatusCard from "../components/StatusCard";

export default function Cars() {
  const [cars, setCars] = useState([]);
  const [status, setStatus] = useState("All Status");
  const [searchTerm, setSearchTerm] = useState("");

  const availableCount = cars.filter(car => car.status.toLowerCase() === "available").length;
  const rentedCount = cars.filter(car => car.status.toLowerCase() === "rented").length;
  const maintenanceCount = cars.filter(car => car.status.toLowerCase() === "maintenance").length;

  useEffect(() => {
    const url =
      status === "All Status"
        ? "http://localhost:3000/car/cars"
        : `http://localhost:3000/car/cars/status/${status}`;
    axios
      .get(url)
      .then(res => setCars(res.data))
      .catch(err => console.error("Error fetching cars:", err));
  }, [status]);

  const handleDelete = id => {
    axios
      .delete(`http://localhost:3000/car/delete-car/${id}`)
      .then(() => setCars(prev => prev.filter(car => car.id !== id)))
      .catch(err => console.error("Error deleting car:", err));
  };

  return (
    <div className="container-fluid py-5 px-4" style={{ backgroundColor: "#0e0e0e", minHeight: "100vh" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold" style={{color:"#f4c04c"}}>Manage Cars</h1>
          <p className="text-secondary">Monitor and control your car fleet</p>
        </div>
        <NavLink
        to="/admin/new-car"
        className="btn fw-bold d-flex align-items-center gap-2 rounded-pill shadow"
        style={{
          backgroundColor: "#f4c04c",
          color: "#000"
        }}
      >
        <FaPlus /> Add Car
      </NavLink>
      </div>

      {/* Search & Filter */}
      <div className="row g-3 align-items-center mb-4">
        <div className="col-md-9">
          <input
            type="text"
            className="form-control text-white border-0 shadow" 
            style={{backgroundColor:"#000"}}
            placeholder="Search cars..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select text-white border-0 shadow"
            style={{backgroundColor:"#000"}}
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            <option>All Status</option>
            <option>Available</option>
            <option>Rented</option>
            <option>Maintenance</option>
          </select>
        </div>
      </div>

      {/* Status Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <StatusCard
            title="Available Cars"
            count={availableCount}
            description="Ready for rental"
            color="#28a745"
          />
        </div>
        <div className="col-md-4">
          <StatusCard
            title="Rented Cars"
            count={rentedCount}
            description="Currently rented"
            color="#F4C04C"
          />
        </div>
        <div className="col-md-4">
          <StatusCard
            title="Maintenance Cars"
            count={maintenanceCount}
            description="In service"
            color="#dc3545"
          />
        </div>
      </div>

      {/* Car Cards */}
      <div className="row g-4">
        {cars.filter(car =>
          car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          car.model?.toLowerCase().includes(searchTerm.toLowerCase())
        ).map((car, i) => (
          <div className="col-md-4" key={i}>
            <CardProduct {...car} onDelete={handleDelete} />
          </div>
        ))}

        {cars.filter(car =>
          car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          car.model?.toLowerCase().includes(searchTerm.toLowerCase())
        ).length === 0 && (
          <div className="text-center text-secondary w-100 py-5">
            <p>No cars found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

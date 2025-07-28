import { NavLink } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import StatusCard from "../components/StatusCard";
import Status from "../components/Status";

export default function Rentals() {
  const [rentals, setRentals] = useState([]);
  const [status, setStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [deleterentalId, setDeleterentalId] = useState(null);
  const [deleterentalName, setDeleterentalName] = useState('');
  const [stats, setStats] = useState({});

  function calcDuration(rentalDate, returnDate) {
    if (!rentalDate || !returnDate) return '-';
    const start = new Date(rentalDate);
    const end = new Date(returnDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + (diffDays > 1 ? ' days' : ' day');
  }

  useEffect(() => {
    axios.get('http://localhost:3000/rental/rentals/details')
      .then(res => setRentals(res.data))
      .catch(err => console.error("Error fetching rentals:", err));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3000/rental/rentals/stats")
      .then(res => setStats(res.data))
      .catch(err => console.error("Failed to fetch stats:", err));
  }, []);

  const openModal = (id, fullname) => {
    setDeleterentalId(id);
    setDeleterentalName(fullname);
    setShowModal(true);
  };

  const closeModal = () => {
    setDeleterentalId(null);
    setDeleterentalName('');
    setShowModal(false);
  };

  const confirmDelete = () => {
    axios.delete(`http://localhost:3000/rental/rentals/${deleterentalId}`)
      .then(() => {
        setRentals(prev => prev.filter(u => u.rental_id !== deleterentalId));
        closeModal();
      })
      .catch(() => {
        alert("Error deleting rental. Please try again.");
        closeModal();
      });
  };

  return (
    <div className="container mt-5 text-light">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold"style={{color: "#f4c04c"}} >Rental Management</h1>
          <p className="text-secondary">Track and manage all rental activities</p>
        </div>
        <NavLink to="/admin/new-rental" className="btn fw-bold d-flex align-items-center gap-2 rounded-pill shadow"
        style={{
          backgroundColor: "#f4c04c",
          color: "#000"
        }}>
          <FaCalendarAlt /> New Rental
        </NavLink>
      </div>

      <div className="row g-3 align-items-center mb-4">
        <div className="col-md-10">
          <input type="text" className="form-control text-dark border-0 shadow"style={{backgroundColor: "#000"}}  placeholder="Search rentals..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <div className="col-md-2">
          <select className="form-select text-light border-0 shadow" style={{backgroundColor: "#000"}} value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="In process">In process</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="row g-4 mb-5">
        <div className="col-md-3">
          <StatusCard title="Active Rentals" count={stats.activeRentals || 0} status="Active" />
        </div>
        <div className="col-md-3">
          <StatusCard title="Completed" count={stats.completedRentals || 0} status="Completed" />
        </div>
        <div className="col-md-3">
          <StatusCard title="In process" count={stats.inProcessRentals || 0} status="In process" />
        </div>
        <div className="col-md-3">
          <StatusCard title="Total Revenue" count={`${stats.totalRevenue || 0} Dh`} status="Danger" />
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-dark table-hover rounded">
          <thead className="thead-light">
            <tr>
              <th>Rental ID</th>
              <th>Customer</th>
              <th>Vehicle</th>
              <th>Duration</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rentals.filter(rental => (status === "all" || (rental.status && rental.status.toLowerCase() === status.toLowerCase())) && rental.customer_name.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">
                  <img src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png" alt="Not found" width="80" height="80" style={{ opacity: 0.6 }} />
                  <div className="mt-2">
                    {searchTerm.trim() !== '' ? (
                      <>No customer found matching: <span className="text-warning">"{searchTerm}"</span></>
                    ) : (
                      <>No customers available for status: <span className="text-warning">"{status}"</span></>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              rentals
                .filter(rental => (status === "all" || (rental.status && rental.status.toLowerCase() === status.toLowerCase())) && rental.customer_name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map(rental => (
                  <tr key={rental.rental_id}>
                    <td>{rental.rental_id}</td>
                    <td>{rental.customer_name}</td>
                    <td>{rental.vehicle_brand} {rental.vehicle_model}</td>
                    <td>{calcDuration(rental.rental_date, rental.return_date)}</td>
                    <td>{rental.amount} Dh</td>
                    <td><Status bgstatus={rental.status} typestatus={rental.status} mode="table" /></td>
                    <td>
                      <NavLink className="btn btn-outline-light btn-sm me-2"><FaEye /></NavLink>
                      <NavLink className="btn btn-outline-warning btn-sm me-2"><FaEdit /></NavLink>
                      <NavLink className="btn btn-outline-danger btn-sm" onClick={() => openModal(rental.rental_id, rental.customer_name)}><FaTrash /></NavLink>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal show fade d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmation</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <p>Voulez-vous vraiment supprimer <strong>{deleterentalName}</strong> ?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModal}>Annuler</button>
                <button className="btn btn-danger" onClick={confirmDelete}>Supprimer</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

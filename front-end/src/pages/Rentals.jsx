import { FaTrash, FaTimesCircle, FaCheckCircle, FaSpinner } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import StatusCard from "../components/StatusCard";
import Status from "../components/Status";

export default function Rentals() {
  const [rentals, setRentals] = useState([]);
  const [status, setStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteRentalId, setDeleteRentalId] = useState(null);
  const [deleteRentalName, setDeleteRentalName] = useState("");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelRentalId, setCancelRentalId] = useState(null);
  const [cancelRentalName, setCancelRentalName] = useState("");
  const [stats, setStats] = useState({});

  function calcDuration(rentalDate, returnDate) {
    if (!rentalDate || !returnDate) return "-";
    const start = new Date(rentalDate);
    const end = new Date(returnDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + (diffDays > 1 ? " days" : " day");
  }

  function calculateStats(rentalsList) {
    let activeRentals = 0;
    let completedRentals = 0;
    let inProcessRentals = 0;
    let cancelledRentals = 0;
    let totalRevenue = 0;

    rentalsList.forEach((r) => {
      const st = r.status?.toLowerCase();
      if (st === "active") activeRentals++;
      else if (st === "completed") completedRentals++;
      else if (st === "in process") inProcessRentals++;
      else if (st === "canceled") cancelledRentals++;

      totalRevenue += parseFloat(r.amount) || 0;
    });

    return {
      activeRentals,
      completedRentals,
      inProcessRentals,
      cancelledRentals,
      totalRevenue,
    };
  }

  useEffect(() => {
    axios
      .get("http://localhost:3000/rental/rentals/details")
      .then((res) => {
        setRentals(res.data);
        setStats(calculateStats(res.data));
      })
      .catch((err) => console.error("Error fetching rentals:", err));
  }, []);

  const updateRentalStatus = (id, newStatus) => {
    axios
      .put(`http://localhost:3000/rental/rentals/${id}`, {
        status: newStatus.trim(),
      })
      .then(() => {
        setRentals((prevRentals) => {
          const updated = prevRentals.map((rental) =>
            rental.rental_id === id
              ? { ...rental, status: newStatus.trim() }
              : rental
          );
          setStats(calculateStats(updated));
          return updated;
        });
      })
      .catch(() => {
        alert("Error updating status. Please try again.");
      });
  };

  const openDeleteModal = (id, name) => {
    setDeleteRentalId(id);
    setDeleteRentalName(name);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteRentalId(null);
    setDeleteRentalName("");
    setShowDeleteModal(false);
  };

  const confirmDelete = () => {
    axios
      .delete(`http://localhost:3000/rental/rentals/${deleteRentalId}`)
      .then(() => {
        setRentals((prev) => {
          const updated = prev.filter((r) => r.rental_id !== deleteRentalId);
          setStats(calculateStats(updated));
          return updated;
        });
        closeDeleteModal();
      })
      .catch(() => {
        alert("Error deleting rental. Please try again.");
        closeDeleteModal();
      });
  };

  const openCancelModal = (id, name) => {
    setCancelRentalId(id);
    setCancelRentalName(name);
    setShowCancelModal(true);
  };

  const closeCancelModal = () => {
    setCancelRentalId(null);
    setCancelRentalName("");
    setShowCancelModal(false);
  };

  const confirmCancel = () => {
    updateRentalStatus(cancelRentalId, "Canceled");
    closeCancelModal();
  };

  const filteredRentals = rentals
    .filter((rental) => {
      if (status === "all") return true;
      return rental.status?.trim().toLowerCase() === status.trim().toLowerCase();
    })
    .filter((rental) =>
      rental.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="container mt-5 text-light">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold" style={{ color: "#f4c04c" }}>
            Rental Management
          </h1>
          <p className="text-secondary">Track and manage all rental activities</p>
        </div>
      </div>

      <div className="row g-3 align-items-center mb-4">
        <div className="col-md-10">
          <input
            type="text"
            className="form-control text-dark border-0 shadow"
            style={{ backgroundColor: "#000" }}
            placeholder="Search rentals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <select
            className="form-select text-light border-0 shadow"
            style={{ backgroundColor: "#000" }}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="In process">In process</option>
            <option value="Canceled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Cards row */}
      <div className="row mb-5 gx-3">
        <div className="col-md-2">
          <StatusCard title="Active Rentals" count={stats.activeRentals || 0} status="Active" />
        </div>
        <div className="col-md-2">
          <StatusCard title="Completed" count={stats.completedRentals || 0} status="Completed" />
        </div>
        <div className="col-md-2">
          <StatusCard title="In process" count={stats.inProcessRentals || 0} status="In process" />
        </div>
        <div className="col-md-2">
          <StatusCard title="Canceled" count={stats.cancelledRentals || 0} status="Canceled" />
        </div>
        <div className="col-md-2">
          <StatusCard title="Total Revenue" count={`${stats.totalRevenue || 0} Dh`} status="Revenue" />
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
            {filteredRentals.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
                    alt="Not found"
                    width="80"
                    height="80"
                    style={{ opacity: 0.6 }}
                  />
                  <div className="mt-2">
                    {searchTerm.trim() !== "" ? (
                      <>
                        No customer found matching:{" "}
                        <span className="text-warning">"{searchTerm}"</span>
                      </>
                    ) : (
                      <>
                        No customers available for status:{" "}
                        <span className="text-warning">"{status}"</span>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              filteredRentals.map((rental) => (
                <tr key={rental.rental_id}>
                  <td>{rental.rental_id}</td>
                  <td>{rental.customer_name}</td>
                  <td>
                    {rental.vehicle_brand} {rental.vehicle_model}
                  </td>
                  <td>{calcDuration(rental.rental_date, rental.return_date)}</td>
                  <td>{rental.amount} Dh</td>
                  <td>
                    <Status bgstatus={rental.status} typestatus={rental.status} mode="table" />
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-danger btn-sm me-1"
                      onClick={() => openDeleteModal(rental.rental_id, rental.customer_name)}
                      title="Delete Rental"
                    >
                      <FaTrash />
                    </button>

                    {rental.status.toLowerCase() !== "canceled" && (
                      <button
                        className="btn btn-outline-warning btn-sm me-1"
                        onClick={() => openCancelModal(rental.rental_id, rental.customer_name)}
                        title="Cancel Rental"
                      >
                        <FaTimesCircle />
                      </button>
                    )}

                    {rental.status.toLowerCase() !== "completed" && (
                      <button
                        className="btn btn-outline-success btn-sm me-1"
                        onClick={() => updateRentalStatus(rental.rental_id, "Completed")}
                        title="Mark Completed"
                      >
                        <FaCheckCircle />
                      </button>
                    )}

                    {rental.status.toLowerCase() !== "in process" && (
                      <button
                        className="btn btn-outline-info btn-sm"
                        onClick={() => updateRentalStatus(rental.rental_id, "In process")}
                        title="Mark In Process"
                      >
                        <FaSpinner />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal show fade d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmation</h5>
                <button type="button" className="btn-close" onClick={closeDeleteModal}></button>
              </div>
              <div className="modal-body">
                <p>Voulez-vous vraiment supprimer <strong>{deleteRentalName}</strong> ?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeDeleteModal}>Annuler</button>
                <button className="btn btn-danger" onClick={confirmDelete}>Supprimer</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="modal show fade d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Cancellation</h5>
                <button type="button" className="btn-close" onClick={closeCancelModal}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to cancel the rental for <strong>{cancelRentalName}</strong>?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeCancelModal}>No, Keep It</button>
                <button className="btn btn-warning" onClick={confirmCancel}>Yes, Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

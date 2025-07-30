import { NavLink } from "react-router-dom";
import { FaPlus, FaTrash, FaBan, FaEnvelope } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { useState, useEffect } from "react";
import axios from "axios";
import StatusCard from "../components/StatusCard";
import Status from "../components/Status";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("All Status");
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [deleteUserName, setDeleteUserName] = useState("");
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    bannedUsers: 0,
  });

  const [messages, setMessages] = useState([]);
  const [selectedMsg, setSelectedMsg] = useState(null);

  // Fetch users
  useEffect(() => {
    axios
      .get("http://localhost:3000/user/users/details")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  // Fetch stats
  useEffect(() => {
    axios
      .get("http://localhost:3000/user/users/stats")
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Failed to fetch user stats:", err));
  }, []);

  // Fetch contact messages
  useEffect(() => {
    axios
      .get("http://localhost:3000/contact/contacts")
      .then((res) => setMessages(res.data))
      .catch((err) => console.error("Error fetching contact messages", err));
  }, []);

  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  // Delete modal handlers
  const openModal = (id, fullname) => {
    setDeleteUserId(id);
    setDeleteUserName(fullname);
    setShowModal(true);
  };
  const closeModal = () => {
    setDeleteUserId(null);
    setDeleteUserName("");
    setShowModal(false);
  };
  const confirmDelete = () => {
    axios
      .delete(`http://localhost:3000/user/users/${deleteUserId}`)
      .then(() => {
        setUsers((prev) => prev.filter((u) => u.user_id !== deleteUserId));
        closeModal();
      })
      .catch(() => {
        alert("Error deleting user. Please try again.");
        closeModal();
      });
  };

  // Ban user handler
  const handleBan = (userId) => {
    if (window.confirm("هل أنت متأكد من حظر هذا المستخدم؟")) {
      axios
        .put(`http://localhost:3000/user/users/ban/${userId}`)
        .then(() => {
          setUsers((prev) =>
            prev.map((u) =>
              u.user_id === userId ? { ...u, status: "banned" } : u
            )
          );
        })
        .catch(() => alert("حدث خطأ أثناء حظر المستخدم"));
    }
  };

  // Open message modal
  const openMsgModal = (msg) => setSelectedMsg(msg);
  const closeMsgModal = () => setSelectedMsg(null);

  return (
    <>
      <div className="container" >
        <div className="d-flex justify-content-between">
          <div>
            <h1
              className="fw-bold"
              style={{ color: "#f4c04c", marginTop: "2rem" }}
            >
              Customer Management
            </h1>
            <p className="text-secondary">
              Manage your customer database and rental history
            </p>
          </div>
        </div>

        {/* Search and filter */}
        <div className="mt-5 d-flex justify-content-between row">
          <div className="searchinput col-md-10">
            <input
              type="text"
              className="form-control text-white border-0 shadow"
              style={{ backgroundColor: "#000" }}
              placeholder="Search Customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="col-md-2">
            <select
              className="form-select px-3 text-white border-0 shadow"
              style={{ backgroundColor: "#000" }}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="banned">Banned</option>
            </select>
          </div>
        </div>

        {/* Stats cards */}
        <div className="row mt-5">
          <div className="col-md-3 mb-4">
            <StatusCard
              title="Total Customers"
              count={stats.totalUsers}
              status="info"
            />
          </div>
          <div className="col-md-3 mb-4">
            <StatusCard
              title="Active Users"
              count={stats.activeUsers}
              status="success"
            />
          </div>
          <div className="col-md-3 mb-4">
            <StatusCard
              title="Inactive Users"
              count={stats.inactiveUsers}
              status="warning"
            />
          </div>
          <div className="col-md-3 mb-4">
            <StatusCard
              title="Banned Users"
              count={stats.bannedUsers}
              status="danger"
            />
          </div>
        </div>

        {/* Users table */}
        <table
          className="table table-dark table-hover mt-5"
          style={{
            borderRadius: "12px",
            overflow: "hidden",
            backgroundColor: "#111",
            boxShadow: "0 0 12px rgba(244, 192, 76, 0.08)",
            marginBottom:"4rem"
          }}
        >
          <thead style={{ backgroundColor: "#1a1a1a", color: "#f4c04c" }}>
            <tr>
              <th
                style={{
                  padding: "16px",
                  fontSize: "0.9rem",
                  textTransform: "uppercase",
                }}
              >
                Customer
              </th>
              <th
                style={{
                  padding: "16px",
                  fontSize: "0.9rem",
                  textTransform: "uppercase",
                }}
              >
                Contact
              </th>
              <th
                style={{
                  padding: "16px",
                  fontSize: "0.9rem",
                  textTransform: "uppercase",
                }}
              >
                Rental History
              </th>
              <th
                style={{
                  padding: "16px",
                  fontSize: "0.9rem",
                  textTransform: "uppercase",
                }}
              >
                Total Spent
              </th>
              <th
                style={{
                  padding: "16px",
                  fontSize: "0.9rem",
                  textTransform: "uppercase",
                }}
              >
                Status
              </th>
              <th
                style={{
                  padding: "16px",
                  fontSize: "0.9rem",
                  textTransform: "uppercase",
                }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter(
                (user) =>
                  (status === "All Status" ||
                    (user.status &&
                      user.status.toLowerCase() === status.toLowerCase())) &&
                  user.fullname.toLowerCase().includes(searchTerm.toLowerCase())
              ).length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center text-white py-4"
                  style={{ fontWeight: "600" }}
                >
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
                        <span style={{ color: "#FF9F43" }}>"{searchTerm}"</span>
                      </>
                    ) : (
                      <>
                        No customers available for status:{" "}
                        <span style={{ color: "#FF9F43" }}>"{status}"</span>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              users
                .filter(
                  (user) =>
                    (status === "All Status" ||
                      (user.status &&
                        user.status.toLowerCase() === status.toLowerCase())) &&
                    user.fullname.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((user) => (
                  <tr
                    key={user.user_id}
                    style={{ borderBottom: "1px solid #222" }}
                  >
                    <td
                      style={{
                        padding: "16px",
                        color: "#ddd",
                        verticalAlign: "middle",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: "#f4c04c",
                            color: "#000",
                            fontWeight: "bold",
                            fontSize: "16px",
                            width: "35px",
                            height: "35px",
                            borderRadius: "50%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            userSelect: "none",
                          }}
                        >
                          {getInitials(user.fullname)}
                        </div>
                        <div>
                          <div>{user.fullname}</div>
                          <div
                            style={{ fontSize: "0.8em", color: "#aaa" }}
                          >{`ID: ${user.customerID || "KM00" + user.user_id}`}</div>
                        </div>
                      </div>
                    </td>
                    <td
                      style={{
                        padding: "16px",
                        color: "#ddd",
                        verticalAlign: "middle",
                      }}
                    >
                      <div>
                        <MdOutlineMail /> {user.email}
                      </div>
                      <div
                        style={{ fontSize: "0.8em", color: "#aaa" }}
                      >
                        <FiPhone /> {user.phone}
                      </div>
                    </td>
                    <td
                      style={{
                        padding: "16px",
                        color: "#ddd",
                        verticalAlign: "middle",
                      }}
                    >
                      <div>
                        {user.rentalCount} rental{user.rentalCount > 1 ? "s" : ""}
                      </div>
                      <div style={{ fontSize: "0.8em", color: "#aaa" }}>
                        Last:{" "}
                        {user.lastRentalDate
                          ? new Date(user.lastRentalDate).toLocaleDateString()
                          : "-"}
                      </div>
                    </td>
                    <td
                      style={{
                        padding: "16px",
                        color: "#ddd",
                        verticalAlign: "middle",
                      }}
                    >
                      $
                      {user.totalSpent
                        ? Number(user.totalSpent)
                            .toFixed(0)
                            .replace(/\B(?=(\d{3})+(?!\d))/g, "\u202F")
                        : "0"}
                    </td>
                    <td
                      style={{
                        padding: "16px",
                        color: "#ddd",
                        verticalAlign: "middle",
                      }}
                    >
                      <Status
                        bgstatus={user.status}
                        typestatus={user.status}
                        mode="table"
                      />
                    </td>
                    <td
                      style={{
                        padding: "16px",
                        verticalAlign: "middle",
                      }}
                    >
                      <button
                        className="btn btn-sm"
                        style={{
                          backgroundColor: "#c0392b",
                          color: "white",
                          border: "none",
                          borderRadius: "8px",
                          marginRight: "8px",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBan(user.user_id);
                        }}
                        title="Ban User"
                      >
                        <FaBan />
                      </button>
                      <button
                        className="btn btn-sm"
                        style={{
                          backgroundColor: "#f39c12",
                          color: "black",
                          border: "none",
                          borderRadius: "8px",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal(user.user_id, user.fullname);
                        }}
                        title="Delete User"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>

        {/* Delete confirmation modal */}
        {showModal && (
          <div
            className="modal show fade d-block"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirmation</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>
                    Voulez-vous vraiment supprimer{" "}
                    <strong>{deleteUserName}</strong> ?
                  </p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={closeModal}>
                    Annuler
                  </button>
                  <button className="btn btn-danger" onClick={confirmDelete}>
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Messages Card */}
        <div className="card  text-white mt-4 shadow" style={{ marginBottom:"4rem"}} >
          <div
            className="card-header fw-bold d-flex align-items-center gap-2"
            style={{ cursor: "default" , backgroundColor:"#000" }}
          >
            <FaEnvelope size={24} />
            Contact Messages
          </div>
          <ul className="list-group list-group-flush">
            {messages.length === 0 ? (
              <li className="list-group-item bg-dark text-muted">
                No messages yet
              </li>
            ) : (
              messages.map((msg) => (
                <li
                  key={msg.id}
                  className="list-group-item text-white border-bottom d-flex justify-content-between align-items-center"
                  style={{ cursor: "pointer" , backgroundColor:"#000" }}
                  onClick={() => openMsgModal(msg)}
                  title="Click to view full message"
                >
                  <div>
                    <strong>{msg.name}</strong> ({msg.email})
                    <div
                      className="text-secondary"
                      style={{ fontSize: "0.9em" }}
                    >
                      {msg.phone}
                    </div>
                  </div>
                  <div style={{ fontSize: "0.8em", color: "#f4c04c" }}>
                    {new Date(msg.created_at.replace(" ", "T")).toLocaleString()}
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Message Modal */}
        {selectedMsg && (
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            role="dialog"
            style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
            onClick={closeMsgModal}
          >
            <div
              className="modal-dialog modal-dialog-centered"
              role="document"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content bg-dark text-white">
                <div className="modal-header border-bottom-0">
                  <h5 className="modal-title">{selectedMsg.name}'s Message</h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={closeMsgModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>
                    <strong>Email:</strong> {selectedMsg.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {selectedMsg.phone || "N/A"}
                  </p>
                  <hr style={{ borderColor: "#f4c04c" }} />
                  <p>{selectedMsg.message}</p>
                </div>
                <div className="modal-footer border-top-0">
                  <small className="text-muted">
                    Sent at:{" "}
                    {new Date(selectedMsg.created_at.replace(" ", "T")).toLocaleString()}
                  </small>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

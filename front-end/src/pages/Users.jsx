import { NavLink } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { MdOutlineMail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import StatusCard from "../components/StatusCard";
import Status from "../components/Status"

export default function Users() {
    const [rentals, setUsers] = useState([]);
    const [status, setStatus] = useState('All Status')
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState(null);
    const [deleteUserName, setDeleteUserName] = useState('');
    const [stats, setStats] = useState({
    activeRentals: 0,
    completedRentals: 0,
    inProcessRentals: 0,
    activeCustomers: 0,
    totalRevenue: 0,
    avgRevenuePerCustomer: 0,
  });


    const getInitials = (name) => {
        if (!name) return '';
        const parts = name.trim().split(' ');
        if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
        return (parts[0][0] + parts[1][0]).toUpperCase();
    };


    useEffect(() => {
        axios.get('http://localhost:3000/user/users/details')
            .then(res => setUsers(res.data))
            .catch(err => console.error("Error fetching users:", err));
    }, []);

    useEffect(() => {
        axios.get("http://localhost:3000/rental/rentals/stats")
            .then(res => setStats(res.data))
            .catch(err => console.error("Failed to fetch stats:", err));
    }, []);




    const openModal = (id, fullname) => {
        setDeleteUserId(id);
        setDeleteUserName(fullname);
        setShowModal(true);
    };

    const closeModal = () => {
        setDeleteUserId(null);
        setDeleteUserName('');
        setShowModal(false);
    };

    const confirmDelete = () => {
        axios.delete(`http://localhost:3000/user/users/${deleteUserId}`)
            .then(() => {
                setUsers(prev => prev.filter(u => u.user_id !== deleteUserId));
                closeModal();
            })
            .catch(() => {
                alert("Error deleting user. Please try again.");
                closeModal();
            });
    };


    return (
        <>
            <div className="container">
                <div className="d-flex justify-content-between">
                    <div className="">
                        <h1 className="fw-bold" style={{ fontWeight: '700' , color:"#f4c04c", marginTop:"2rem"}}>Customer Management</h1>
                        <p className="text-secondary">Manage your customer database and rental history</p>
                    </div>
                    {/*<div className="mt-4">
                        <NavLink to={"/admin/new-user"} className="addbtn text-light"><FaPlus />  Add Customer</NavLink>
                    </div>*/}
                </div>

                <div className="mt-5 d-flex justify-content-between row">
                    <div className="searchinput col-md-10"><input type="text" className="form-control text-white border-0 shadow" style={{backgroundColor:"#000"}} placeholder="Search Customers..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>

                    <div className="col-md-2">
                        <select
                            className="form-select px-3 text-white border-0 shadow" style={{backgroundColor:"#000"}}
                            value={status}
                            onChange={(e) => setStatus(e.target.value)} >
                            <option>All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="pending">pending</option>
                            <option value="banned">banned</option>
                        </select>
                    </div>
                </div>


                <div className="row mt-5 container">
                    <div className="col-md-3 mb-4">
                        <StatusCard
                            title="Total Customers"
                            count={stats.activeCustomers}
                            status="completed"
                        />
                    </div>
                    <div className="col-md-3 mb-4">
                        <StatusCard
                            title="Active Rentals"
                            count={stats.activeRentals}
                            status="completed"
                        />
                    </div>
                    <div className="col-md-3 mb-4">
                        <StatusCard
                            title="Total Revenue"
                            count={`${stats.totalRevenue} Dh`}
                            status="Active"
                        />
                    </div>
                    <div className="col-md-3 mb-4">
                        <StatusCard
                            title="Avg. Revenue/Customer"
                            count={`${Number(stats.avgRevenuePerCustomer).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} Dh`}
                            status="completed"
                        />
                    </div>

                    


                </div>




                <table className="table  overflow-hidden  mt-5">
                    <thead>
                        <tr>
                            <th>Customer</th>
                            <th>Contact</th>
                            <th>Rental History</th>
                            <th>Total Spent</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rentals
                            .filter(user =>
                                (status === "All Status" || (user.status && user.status.toLowerCase() === status.toLowerCase())) &&
                                user.fullname.toLowerCase().includes(searchTerm.toLowerCase())
                            ).length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center text-white">
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
                                        alt="Not found"
                                        width="80"
                                        height="80"
                                        style={{ opacity: 0.6 }}
                                    />
                                    <div className="mt-2">
                                        {
                                            searchTerm.trim() !== '' ? (
                                                <>No customer found matching: <span style={{ color: "#FF9F43" }}>"{searchTerm}"</span></>
                                            ) : (
                                                <>No customers available for status: <span style={{ color: "#FF9F43" }}>"{status}"</span></>
                                            )
                                        }
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            rentals
                                .filter(user =>
                                    (status === "All Status" || (user.status && user.status.toLowerCase() === status.toLowerCase())) &&
                                    user.fullname.toLowerCase().includes(searchTerm.toLowerCase())
                                )


                                .map(user => (
                                    <tr key={user.user_id}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <div style={{
                                                    backgroundColor: '#E17466',
                                                    color: 'white',
                                                    fontWeight: 'bold',
                                                    fontSize: '16px',
                                                    width: '35px',
                                                    height: '35px',
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    userSelect: 'none'
                                                }}>
                                                    {getInitials(user.fullname)}
                                                </div>
                                                <div>
                                                    <div>{user.fullname}</div>
                                                    <div style={{ fontSize: '0.8em', color: '#aaa' }}>ID: {user.customerID || "KM00" + user.user_id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div><MdOutlineMail /> {user.email}</div>
                                            <div style={{ fontSize: '0.8em', color: '#aaa' }}><FiPhone /> {user.phone}</div>
                                        </td>
                                        <td>
                                            <div>{user.rentalCount} rental{user.rentalCount > 1 ? 's' : ''}</div>
                                            <div style={{ fontSize: '0.8em', color: '#aaa' }}>
                                                Last: {user.lastRentalDate ? new Date(user.lastRentalDate).toLocaleDateString() : '-'}
                                            </div>
                                        </td>
                                        <td>${user.totalSpent ? Number(user.totalSpent).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : '0'}</td>
                                        <td ><Status bgstatus={user.status} typestatus={user.status} mode="table" /></td>
                                        <td>
                                            <NavLink className="btn3 view-btn me-2"><FaEye /></NavLink>
                                            <NavLink className="btn3 edit-btn me-2"><FaEdit /></NavLink>
                                            <NavLink className="btn3 delete-btn " onClick={() => openModal(user.user_id, user.fullname)}><FaTrash /></NavLink>

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
                                <p>Voulez-vous vraiment supprimer <strong>{deleteUserName}</strong> ?</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={closeModal}>Annuler</button>
                                <button className="btn btn-danger" onClick={confirmDelete}>Supprimer</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


        </>
    )
}
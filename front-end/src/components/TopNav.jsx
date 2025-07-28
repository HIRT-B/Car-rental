import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

export default function TopNav() {
  return (
    <nav className="navbar fixed-top navbar-light shadow-sm" style={{backgroundColor:"black",position: "fixed",
  top: "0",
  left: "0",
  width: "100",
  zIndex: "1000"}}>
      <div className="container-fluid">
        <NavLink><img src="../public/logo.png" alt="" height="80px"/></NavLink>
        <div className="dropdown">
          <button className="btn btn-link dropdown-toggle" id="userMenu" data-bs-toggle="dropdown">
            <FaUserCircle size={24} className="text-light"/>
          </button>
          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userMenu">
            <li><a className="dropdown-item" href="#">My Account</a></li>
            <li><a className="dropdown-item" href="#">Messages</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Logout</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

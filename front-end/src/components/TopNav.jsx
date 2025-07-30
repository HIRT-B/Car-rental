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
      </div>
    </nav>
  );
}

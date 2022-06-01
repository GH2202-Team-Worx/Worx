import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { createProduct } from "../../store/products";
import "../styles/AdminDash.css";
// import "../styles/AllUsers";

const AdminDashboard = () => {
  return (
    <div className="admin-dash-container">
      <Link to="/orders">
        <button className="admin-dash-button">Manage Orders</button>
      </Link>
      <Link to="/allUsers">
        <button className="admin-dash-button">Manage Users</button>
      </Link>
      <Link to="/adminproducts">
        <button className="admin-dash-button">Manage Products</button>
      </Link>
    </div>
  );
};

export default AdminDashboard;

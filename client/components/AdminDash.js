import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { createProduct } from "../store/products";
import "./styles/AdminDash.css";

const AdminDashboard = () => {
  return (
    <div className="admin-dash-container">
      <Link to="/orders">
        <button className="admin-dash-button">Manage Orders</button>
      </Link>
      <button className="admin-dash-button">Manage Users</button>
      <Link to="/addproduct">
        <button className="admin-dash-button">Manage Products</button>
      </Link>
    </div>
  );
};

export default AdminDashboard;

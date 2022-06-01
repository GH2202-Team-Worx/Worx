import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AdminDash.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dash-container">
      <Link to="/orders">
        <button className="admin-dash-button">Manage Orders</button>
      </Link>
      <Link to="/allUsers">
        <button className="admin-dash-button">Manage Users</button>
      </Link>
      <Link to="/addproduct">
        <button className="admin-dash-button">Manage Products</button>
      </Link>
    </div>
  );
};

export default AdminDashboard;

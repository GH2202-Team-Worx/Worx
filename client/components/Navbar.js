import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { logout } from "../store";
import "./styles/Navbar.css";
import icon from "../../public/photos/WoodWorxIcon.jpeg";
import { fetchSingleUser } from "../store/users";

const Navbar = ({ handleClick, isLoggedIn }) => {
  let signIn = "";
  if (isLoggedIn) {
    signIn = (
      <div>
        {/* <Link to="/">{this.auth}</Link> */}
        <a href="#" onClick={handleClick}>
          Logout
        </a>
        {/* <Link to='/user'>My Profile</Link> */}
        <Link to="/admin">My Dashboard</Link>
      </div>
    );
  } else {
    signIn = (
      <div>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    );
  }

  return (
    <div className="navbar-container">
      <div className="navbar-left-elements">
        <img className="icon" src={icon} alt="icon" />
        <h1 className="navbar-company-name">
          <Link to="/">
            <div>Bell's</div>
            <div>Custom</div>
            <div>Worx</div>
          </Link>
        </h1>
        <Link className="all-products-link" to="/products">
          All Products
        </Link>
      </div>
      <nav className="nav-links">
        <div>
          <form>
            <input
              className="search-input"
              type="text"
              placeholder="Search Products Here"
            />
            <button className="search-button" type="submit">
              Search
            </button>
          </form>
          <Link to="/contact">Contact Us</Link>
          <Link to="/checkout">Cart</Link>
        </div>
        {signIn}
      </nav>
      {/* <hr /> */}
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
    singleUser: (id) => dispatch(fetchSingleUser(id)),
  };
};

export default connect(mapState, mapDispatch)(Navbar);

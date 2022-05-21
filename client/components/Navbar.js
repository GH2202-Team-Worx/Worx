import React, { useState, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { logout } from "../store";
import "./styles/Navbar.css";
import icon from "../../public/photos/WoodWorxIcon.jpeg";
import { fetchSingleUser } from "../store/users";

// is admin function?
const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => {
  const { cartItems } = useSelector((state) => state.cartReducer);

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
          Shop Products
        </Link>
      </div>
      <nav className="nav-links">
        <div>
          {/* <form>
            <input className="search-input" type="text" placeholder="Search Products Here" />
            <button className="search-button" type="submit">Search</button>
          </form> */}
          {isAdmin ? (
            <Link to="/admin">My Dashboard</Link>
          ) : (
            <Link to="/user">My Profile</Link>
          )}
          <Link to="/contact">Contact Us</Link>
          <Link to="/cart">
            Cart{cartItems.length > 0 ? ` (${cartItems.length})` : ""}{" "}
          </Link>
        </div>
        {isLoggedIn ? (
          <div>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
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
    isAdmin: state.auth.isAdmin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);

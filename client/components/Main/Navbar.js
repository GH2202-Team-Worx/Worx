import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../store";
import "../styles/Navbar.css";
import icon from "../../../public/photos/BellsIcon.png";

const Navbar = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cartReducer);
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

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
        <Link id="all-products-link" to="/products">
          Shop Products
        </Link>
      </div>
      <nav className="nav-links">
        {isAdmin ? <Link to="/admin">My Dashboard</Link> : null}
        <Link to="/contact">Contact Us</Link>
        <Link to="/cart">
          Cart{cartItems.length > 0 ? ` (${cartItems.length})` : ""}{" "}
        </Link>
        {/* </div> */}
        {isLoggedIn && !isAdmin ? (
          <div>
            <Link to="/user">My Profile</Link>
          </div>
        ) : null}
        {isLoggedIn ? (
          <div>
            <a href="#" onClick={() => dispatch(logout())}>
              Logout
            </a>
          </div>
        ) : null}
        {/* <div> */}
        {!isLoggedIn && (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
        {/* </div> */}
      </nav>
    </div>
  );
};

export default Navbar;

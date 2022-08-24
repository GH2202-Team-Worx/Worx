import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../store';
import '../styles/Navbar.css';
import icon from '../../../public/photos/BellsIcon.png';

const Navbar = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cartReducer);
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  return (
    <div className="navbar-container" >
      <div className="navbar-left-elements" onClick={() => {
          setIsNavExpanded(false);
        }}>
        <img className="icon" src={icon} alt="icon" />
        <h1 className="navbar-company-name">
          <Link to="/">
            <div>Bell's</div>
            <div>Custom</div>
            <div>Worx</div>
          </Link>
        </h1>
        <Link id="all-products-link" to="/products">
          Shop
        </Link>
      </div>
      <button className="hamburger" onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="#826e5c"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div className={isNavExpanded ? "nav-links expanded" : "nav-links"} onClick={() => {
          setIsNavExpanded(false);
        }}>
        {isAdmin ? <Link to="/admin">My Dashboard</Link> : null}
        <Link to="/contact">Contact Us</Link>
        <Link to="/cart">
          Cart
          {cartItems.length > 0 ? ` (${cartItems.length})` : ''}{' '}
        </Link>
        {/* </div> */}
        {isLoggedIn && !isAdmin ? (
          <div>
            <Link to="/user">My Profile</Link>
          </div>
        ) : null}
        {isLoggedIn ? (
          <a
            href="#"
            onClick={() => {
              dispatch(logout());
              console.log('hit');
              //  cartItems = 0;
            }}
          >
            Logout
          </a>
        ) : null}
        {!isLoggedIn && (
          <React.Fragment>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default Navbar;

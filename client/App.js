import React from "react";
import { connect } from "react-redux";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Routes from "./Routes";
import { logout } from "./store";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

const App = ({ isLoggedIn }) => {
  console.log("LOGGEDIN: ", isLoggedIn);
  return (
    <div>
      {isLoggedIn && <Navbar />}
      <Routes />
      {isLoggedIn && <Footer />}
    </div>
  );
};

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
  };
};

export default connect(mapState, mapDispatch)(App);

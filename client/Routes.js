
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import AllProducts from "./components/AllProducts";
import Main from "./components/Main";
import Checkout from "./components/Checkout";
import Contact from "./components/Contact";
import { me } from "./store";
import SingleProduct from "./components/SingleProduct";
import SignupForm from "./components/SignupForm";
import AdminDashboard from "./components/AdminDash";
import Orders from "./components/Orders";
import SingleOrder from "./components/SingleOrder";


/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }
  // need (if logged in) if admin show admindashbord else show userdash

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/products" component={AllProducts} />
          <Route path="/products/:productId" component={SingleProduct} />
          <Route path="/contact" component={Contact} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/login" component={LoginForm} />

          <Route path="/signup" component={SignupForm} />
          <Route path="/admin" component={AdminDashboard} />
          <Route exact path="/orders" component={Orders} />
          <Route exact path="/orders/:orderId" component={SingleOrder} />
          <Route path='/user' component={UserDashboard} />
        </Switch>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));

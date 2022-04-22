import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import AllProducts from './components/AllProducts';
import Main from './components/Main';
import Checkout from './components/Checkout';
import Contact from './components/Contact';
import { me } from './store';
import SingleProduct from './components/SingleProduct';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;
    let loggedIn = ''

    if (!isLoggedIn) {
      loggedIn = (<Switch><Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} /></Switch>)
    } else {
      loggedIn = (<Switch><Route path="/signup" component={Signup} /></Switch>)
    }
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/products" component={AllProducts} />
          <Route path="/products/:productId" component={SingleProduct} />
          <Route path="/contact" component={Contact} />
          <Route path="/checkout" component={Checkout} />
        </Switch>
          {loggedIn}
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

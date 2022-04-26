import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import AllProducts from './components/AllProducts';
import Main from './components/Main';
import Checkout from './components/Checkout';
import Cart from './components/Cart';
import Contact from './components/Contact';
import { me } from './store';
import SingleProduct from './components/SingleProduct';
import SignupForm from './components/SignupForm';
import AdminDashboard from './components/AdminDash';
import { intendToPurchase } from './store/cart';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  'pk_test_51KsV0OFre9FhvB1Nn9maNQyFsjbnUnTmzUadLpoQxqD0nKhbcep8g7WQ96OJ35jhTSnRzYOucWnO5ihmXvpjlHIf00lsp2xvDl'
);

/**
 * COMPONENT
 */
const Routes = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const { cartItems, cartTotal, clientSecret } = useSelector(
    (state) => state.cartReducer
  );

  useEffect(() => {
    dispatch(me());
    // Create PaymentIntent as soon as the page loads
    //after stripe works, before using website calc cartTotal on backend and use THAT total to send to stripe
    if (cartTotal) dispatch(intendToPurchase(cartTotal));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/products" component={AllProducts} />
        <Route path="/products/:productId" component={SingleProduct} />
        <Route path="/contact" component={Contact} />
        <Route path="/cart" component={Cart} />
        {/* {clientSecret && ( */}
        {/* <Elements options={options} stripe={stripePromise}> */}
        <Route path="/checkout" component={Checkout} />
        {/* </Elements> */}
        {/* )} */}
        <Route path="/login" component={LoginForm} />
        <Route path="/signup" component={SignupForm} />
        <Route path="/admin" component={AdminDashboard} />
      </Switch>
    </div>
  );
};

/**
 * CONTAINER
 */
// const mapState = (state) => {
//   return {
//     // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
//     // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
//     // isLoggedIn: !!state.auth.id,
//     // auth: state.auth,
//   };
// };

// const mapDispatch = (dispatch) => {
//   return {
//     loadInitialData() {
//       dispatch(me());
//     },
//     // loadCart(userId) {
//     //   dispatch(getCart(userId));
//     // },
//   };
// };

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
// export default withRouter(connect(mapState, mapDispatch)(Routes));

export default Routes;

// componentDidMount() {
// this.props.loadInitialData();
// this.props.loadCart(this.props.auth.id);
// }
// const { isLoggedIn } = this.props;
//   let loggedIn = ''

//   if (!isLoggedIn) {
//     loggedIn = (<Switch><Route path="/login" component={Login} />
//     <Route path="/signup" component={Signup} /></Switch>)
//   } else {
//     loggedIn = (<Switch><Route path="/signup" component={Signup} /></Switch>)
//   }

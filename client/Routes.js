import React, { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/Main/LoginForm";
import AllProducts from "./components/Products/AllProducts";
import Main from "./components/Main/Main";
import Checkout from "./components/Cart/Checkout";
import Cart from "./components/Cart/Cart";
import Contact from "./components/Main/Contact";
import { me } from "./store";
import SingleProduct from "./components/Products/SingleProduct";
import SignupForm from "./components/Main/SignupForm";
import AdminDashboard from "./components/Admin/AdminDash";
import OrderConfirmation from "./components/Cart/OrderConfirmation";
import Orders from "./components/Admin/Orders";
import SingleOrder from "./components/Admin/SingleOrder";
import UserDashboard from "./components/RegisteredUser/UserDash";
import Reviews from "./components/Main/Reviews";
import { getCart, intendToPurchase } from "./store/cart";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import AddProduct from "./components/Admin/AddProduct";
import AllUsers from "./components/Admin/AllUsers";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51KsV0OFre9FhvB1Nn9maNQyFsjbnUnTmzUadLpoQxqD0nKhbcep8g7WQ96OJ35jhTSnRzYOucWnO5ihmXvpjlHIf00lsp2xvDl"
);

/**
 * COMPONENT
 */
const Routes = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const auth = useSelector((state) => state.auth);
  const { cartItems, cartTotal, clientSecret } = useSelector(
    (state) => state.cartReducer
  );

  useEffect(() => {
    dispatch(me());
  }, []);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    // after stripe works, before using website calc cartTotal on backend and use THAT total to send to stripe
    if (cartTotal) dispatch(intendToPurchase(cartTotal));
  }, [cartItems]);

  useEffect(() => {
    if (isLoggedIn) dispatch(getCart(auth.id));
  }, [isLoggedIn]);

  const appearance = {
    theme: "stripe",
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
        <Route
          path="/checkout"
          component={() =>
            clientSecret && (
              <Elements options={options} stripe={stripePromise}>
                <Checkout />
              </Elements>
            )
          }
        />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/signup" component={SignupForm} />
        <Route path="/admin" component={AdminDashboard} />
        <Route exact path="/orders" component={Orders} />
        <Route exact path="/orders/:orderId" component={SingleOrder} />
        <Route path="/order/confirmation" component={OrderConfirmation} />
        <Route path="/user" component={UserDashboard} />
        <Route path="/review" component={Reviews} />
        <Route exact path="/addproduct" component={AddProduct} />
        <Route path="/allUsers" component={AllUsers} />
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

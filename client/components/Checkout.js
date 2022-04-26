import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteProduct,
  _deleteProduct,
  sendOrder,
  intendToPurchase,
} from '../store/cart';
import ShippingInformation from './ShippingInformation';
import BillingInformation from './BillingInformation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import './styles/Checkout.css';
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  'pk_test_51KsV0OFre9FhvB1Nn9maNQyFsjbnUnTmzUadLpoQxqD0nKhbcep8g7WQ96OJ35jhTSnRzYOucWnO5ihmXvpjlHIf00lsp2xvDl'
);

//notes from server/api/orders
//if user is guest, front end should save the cart locally and only send to back end route "api/order/" w/ status "Processing" once order is placed.
//if user is logged in, front end should send cart data to server via "api/order/cart" with status "Cart" whenever cart is modified.

const Checkout = () => {
  const dispatch = useDispatch();

  const [shipping, setShipping] = useState({
    phone: 0,
    //fullname item on shipping info
    streetOne: '',
    streetTwo: '',
    city: '',
    state: '',
    zip: 0,
  });
  const [billing, setBilling] = useState({
    name: '',
    ccn: 0,
    expiry: 0,
    cvc: 0,
  });

  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const { cartItems, cartTotal } = useSelector((state) => state.cartReducer);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    dispatch(intendToPurchase(cartTotal));
  }, []);

  // Getting items from localStorage
  // const storedItems = JSON.parse(localStorage.getItem("cartItems"));

  const sendOrderHandler = () => {
    //compile shipping into sep strings for db
    //cartItems, cartTotal, shipping, billing
    dispatch(sendOrder(cartItems, cartTotal));
  };

  return (
    <div className="checkout-container">
      <div className="checkout-items-display">
        <h3>Items in Order</h3>
        <div>
          {cartItems.length === 0 ? (
            <p>There are no items in your order.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id}>
                <p>{item.name}</p>
                <img className="checkout-image" src={item.image} />
                <ul>
                  <li>{item.description}</li>
                  <li>{`$${item.price}`}</li>
                  <li>{`customization: ${
                    item.customization ? item.customization : 'none'
                  }`}</li>
                  <li>{`${item.isGift ? 'This item is a gift' : ''}`}</li>
                </ul>
              </div>
            ))
          )}
          <div>{`Total Price: $${cartTotal}`}</div>
        </div>
      </div>
      <div className="checkout-shippingBilling-container">
        <ShippingInformation shipping={shipping} setShipping={setShipping} />
        <BillingInformation billing={billing} setBilling={setBilling} />
      </div>
      <button onClick={sendOrderHandler}>Place Order</button>
    </div>
  );
};

export default Checkout;

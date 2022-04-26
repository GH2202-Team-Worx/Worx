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
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import './styles/Checkout.css';

//notes from server/api/orders
//if user is guest, front end should save the cart locally and only send to back end route "api/order/" w/ status "Processing" once order is placed.
//if user is logged in, front end should send cart data to server via "api/order/cart" with status "Cart" whenever cart is modified.

const Checkout = () => {
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const { cartItems, cartTotal } = useSelector((state) => state.cartReducer);

  const stripe = useStripe();
  const elements = useElements();
  // useEffect(() => {
  // Create PaymentIntent as soon as the page loads
  //after stripe works, before using website calc cartTotal on backend and use THAT total to send to stripe
  //   dispatch(intendToPurchase(cartTotal));
  // }, []);

  // Getting items from localStorage
  // const storedItems = JSON.parse(localStorage.getItem("cartItems"));

  const sendOrderHandler = () => {
    //compile shipping into sep strings for db
    //cartItems, cartTotal, shipping, billing
    dispatch(sendOrder(cartItems, cartTotal));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: 'http://localhost:3000',
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message);
    } else {
      setMessage('An unexpected error occured.');
    }

    setIsLoading(false);
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

      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" />
        <button disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              'Pay now'
            )}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </div>
  );
};

export default Checkout;

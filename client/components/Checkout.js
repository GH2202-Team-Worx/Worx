import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteProduct, _deleteProduct, sendOrder } from '../store/cart';
import ShippingInformation from './ShippingInformation';
import BillInformation from './BillingInformation';
import './styles/Checkout.css';

//notes from server/api/orders
//if user is guest, front end should save the cart locally and only send to back end route "api/order/" w/ status "Processing" once order is placed.
//if user is logged in, front end should send cart data to server via "api/order/cart" with status "Cart" whenever cart is modified.

const Checkout = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const params = useParams();
  const [shipping, setShipping] = useState({
    phone: 0,
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
  const { cartItems, cartTotal } = useSelector((state) => state.cartReducer);

  // Getting items from localStorage
  // const storedItems = JSON.parse(localStorage.getItem("cartItems"));

  console.log('CART ITEMS: ', cartItems);

  const deleteItemHandler = (item) => {
    //unable to test if params includes userID without login funtionality
    const userId = params.userId;

    isLoggedIn
      ? dispatch(deleteProduct(userId, item.id))
      : dispatch(_deleteProduct(item));
  };

  const sendOrderHandler = () => {
    dispatch(sendOrder(cartItems, cartTotal));
  };

  return (
    <div className="checkout-container">
      <div className="checkout-items-display">
        <h3>Items in Cart</h3>
        <div>
          {cartItems.length === 0 ? (
            <p>There are no items in your cart.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id}>
                <p>{item.name}</p>
                <ul>
                  <li>{item.description}</li>
                  <li>{`$${item.price}`}</li>
                </ul>
                <button type="button" onClick={() => deleteItemHandler(item)}>
                  Delete Item
                </button>
              </div>
            ))
          )}
          <div>{`Total Price: $${cartTotal}`}</div>
        </div>
      </div>
      <div className="checkout-shippingBilling-container">
        <ShippingInformation shipping={shipping} setShipping={setShipping} />
        <BillInformation billing={billing} setBilling={setBilling} />
      </div>
      <button onClick={sendOrderHandler}>Place Order</button>
    </div>
  );
};

export default Checkout;

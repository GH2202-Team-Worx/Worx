import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import {
  deleteProduct,
  _deleteProduct,
  sendOrder,
} from '../store/cart';
import './styles/Checkout.css';

//notes from server/api/orders
//if user is guest, front end should save the cart locally and only send to back end route "api/order/" w/ status "Processing" once order is placed.
//if user is logged in, front end should send cart data to server via "api/order/cart" with status "Cart" whenever cart is modified.

const Cart = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const params = useParams();
  const { cartItems, cartTotal } = useSelector((state) => state.cartReducer);

  // Getting items from localStorage
  // const storedItems = JSON.parse(localStorage.getItem("cartItems"));

  const deleteItemHandler = (item) => {
    //unable to test if params includes userID without login funtionality
    const userId = params.userId;

    isLoggedIn
      ? dispatch(deleteProduct(userId, item.id))
      : dispatch(_deleteProduct(item));
  };

  const checkoutHandler = () => {
    //compile shipping into sep strings for db
    //cartItems, cartTotal, shipping, billing
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
                <img className='checkout-image' src={item.image} />
                <ul>
                  <li>{item.description}</li>
                  <li>{`$${item.price}`}</li>
                </ul>
                <button type="button" onClick={() => deleteItemHandler(item)}>
                  Delete Item
                </button>
                <label for="customization">Customization:</label>
                <input type="text" id="customization" name="customization" />
                <label for="isGift">Is this a gift?</label>
                <input type="checkbox" id="isGift" name="isGift" />
              </div>
            ))
          )}
          <div>{`Total Price: $${cartTotal}`}</div>
        </div>
      </div>
      <Link to="/checkout">
        <button onClick={checkoutHandler}>Check Out</button>
      </Link>
    </div>
  );
};

export default Cart;

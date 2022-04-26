import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  deleteProduct,
  _deleteProduct,
  editProduct,
  _editProduct,
} from '../store/cart';
import './styles/Checkout.css';

const Cart = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const { cartItems, cartTotal } = useSelector((state) => state.cartReducer);
  const [customization, setCustomization] = useState();
  const [isGift, setIsGift] = useState(false);
  const auth = useSelector((state) => state.auth);
  // Getting items from localStorage
  // const storedItems = JSON.parse(localStorage.getItem("cartItems"));

  const deleteItemHandler = (item) => {
    isLoggedIn
      ? dispatch(deleteProduct(auth.id, item.id))
      : dispatch(_deleteProduct(item));
  };

  const editItemHandler = (item) => {
    isLoggedIn
      ? dispatch(editProduct(auth.id, item))
      : dispatch(_editProduct(item));
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
              <div key={item.productId}>
                <p>{item.name}</p>
                <img className="checkout-image" src={item.image} />
                <p>{`$${item.price}`}</p>
                <button type="button" onClick={() => deleteItemHandler(item)}>
                  Delete Item
                </button>
                <label for="customization">Customization:</label>
                <input
                  type="text"
                  id="customization"
                  name="customization"
                  value={customization}
                  onChange={(evt) => setCustomization(evt.target.value)}
                />
                <button type="button" onClick={() => editItemHandler(item)}>
                  Save Customization
                </button>
                <label for="isGift">Is this a gift?</label>
                <input
                  type="checkbox"
                  id="isGift"
                  name="isGift"
                  onClick={() => setIsGift(!isGift)}
                />
              </div>
            ))
          )}
          <div>{`Total Price: $${cartTotal}`}</div>
        </div>
      </div>
      <Link to="/checkout">
        <button>Check Out</button>
      </Link>
    </div>
  );
};

export default Cart;

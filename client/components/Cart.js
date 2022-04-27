import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getCart,
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
  const [customization, setCustomization] = useState('');
  const [isGift, setIsGift] = useState(false);
  const auth = useSelector((state) => state.auth);

  // Getting items from localStorage
  // const storedItems = JSON.parse(localStorage.getItem("cartItems"));

  //put this on homepage (first page that you go to when someone logs in - or call in thunk when someone logs in - because cart does not show total until you actually click on cart)
  //can load localstorage and this use effect in navbar or routes
  useEffect(() => {
    if (isLoggedIn) dispatch(getCart(auth.id));
  }, []);

  const deleteItemHandler = (item) => {
    isLoggedIn
      ? dispatch(deleteProduct(auth.id, item))
      : dispatch(_deleteProduct(item));
  };

  const editItemHandler = (item, custom) => {
    const updatedItem = { ...item };
    updatedItem.orderproduct.customization = custom;

    isLoggedIn
      ? dispatch(editProduct(auth.id, updatedItem))
      : dispatch(_editProduct(updatedItem));
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
                <img className="checkout-image" src={item.image} />
                <p>{`$${item.price}`}</p>
                <button type="button" onClick={() => deleteItemHandler(item)}>
                  Delete Item
                </button>
                <p>
                  {item.orderproduct.customization
                    ? `Current customization is: ${item.orderproduct.customization}`
                    : ''}
                </p>
                <label htmlFor="customization">Edit Customization:</label>
                <input
                  type="text"
                  id="customization"
                  name="customization"
                  // we don't know why this works but without id it changes every product in cart
                  value={customization.id}
                  onChange={(e) => setCustomization(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => editItemHandler(item, customization)}
                >
                  Save Customization
                </button>
                <label htmlFor="isGift">Is this a gift?</label>
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

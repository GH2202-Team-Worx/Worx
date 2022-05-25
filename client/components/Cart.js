import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import {
  getCart,
  deleteProduct,
  _deleteProduct,
  editProduct,
  _editProduct,
} from "../store/cart";
import "./styles/Cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const { cartItems, cartTotal } = useSelector((state) => state.cartReducer);
  const [customization, setCustomization] = useState(
    cartItems.map((item) =>
      item.orderproduct ? item.orderproduct.customization : ""
    )
  );
  const [isGift, setIsGift] = useState(false);
  const auth = useSelector((state) => state.auth);

  // Getting items from localStorage
  // const storedItems = JSON.parse(localStorage.getItem("cartItems"));

  //put this on homepage (first page that you go to when someone logs in - or call in thunk when someone logs in - because cart does not show total until you actually click on cart)
  //can load localstorage and this use effect in navbar or routes
  useEffect(() => {
    if (isLoggedIn) dispatch(getCart(auth.id));
  }, []);

  useEffect(() => {
    if (isLoggedIn)
      setCustomization(
        cartItems.map((item) =>
          item.orderproduct && item.orderproduct.customization
            ? item.orderproduct.customization
            : ""
        )
      );
  }, [cartItems]);

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
    <div className="cart-container">
      <div className="cart-items-display">
        <h3>Items in Cart</h3>
        <div>
          {cartItems.length === 0 ? (
            <p>There are no items in your cart.</p>
          ) : (
            cartItems.map((item, i) => (
              <div className="cart-item-card" key={item.id}>
                <div>
                  <img className="cart-image" src={item.image} />
                </div>
                <div id="cart-item-details">
                  <h5>{item.name}</h5>

                  <p>{`$${item.price}`}</p>
                  {/* <button type="button" onClick={() => deleteItemHandler(item)}>
                  Delete Item
                </button> */}
                  <p>
                    {item.orderproduct && item.orderproduct.customization
                      ? `Current customization is: ${item.orderproduct.customization}`
                      : ""}
                  </p>
                  <label htmlFor="customization">Edit Customization:</label>
                  <input
                    type="text"
                    id="customization"
                    name="customization"
                    // we don't know why this works but without id it changes every product in cart
                    value={customization[i]}
                    onChange={(e) =>
                      setCustomization(
                        customization.map((c, j) =>
                          j === i ? e.target.value : c
                        )
                      )
                    }
                  />
                  <button
                    type="button"
                    onClick={() => editItemHandler(item, customization[i])}
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
                <div>
                  <button type="button" onClick={() => deleteItemHandler(item)}>
                    Delete Item
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="cart-summary-container">
        <Card id="summary-card">
          <Card.Header as="h5">Cart Overview</Card.Header>
          <Card.Body>
            {/* <Card.Title>Special title treatment</Card.Title> */}
            <Card.Text>{`${cartItems.length} items`}</Card.Text>
            <Card.Text>{`Total Price: $${cartTotal}`}</Card.Text>
            <Link to="/checkout">
              <Button variant="primary">Checkout</Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Cart;

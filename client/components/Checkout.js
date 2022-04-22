import React from "react";
import { useSelector } from "react-redux";

const Checkout = () => {
  const { cartItems, cartTotal } = useSelector((state) => state.cartReducer);

  console.log("CART ITEMS: ", cartItems);

  return (
    <div>
      <h1>I am a checkout page</h1>
      <h3>Items in Cart</h3>
      <div>
        {cartItems.map((item) => (
          <div>
            <p>{item.name}</p>
            <ul>
              <li>{item.description}</li>
            </ul>
          </div>
        ))}
        <div>Running Total: {cartTotal}</div>
      </div>
    </div>
  );
};

export default Checkout;

import React from "react";
import Modal from "./Modal";

const Cart = (props) => {
  const cartItems = (
    <ul>
      {[
        {
          name: "Test Bowl",
          description: "test bowl",
          material: "pine",
          price: 12.5,
          category: "bowl",
        },
      ].map((item) => (
        <div>
          <li>{item.name}</li>
          <li>{item.price}</li>
        </div>
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div>
        <span>Total Amount</span>
        <span>15.75</span>
      </div>
      <div>
        <button onClick={props.onClose}>Close</button>
        <button>Checkout</button>
      </div>
    </Modal>
  );
};

export default Cart;

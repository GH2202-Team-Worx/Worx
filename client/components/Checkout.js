import React from "react";
import { useSelector, useDispatch } from "react-redux";

const Checkout = () => {
  const { cartItems, cartTotal } = useSelector((state) => state.cartReducer);

  console.log("CART ITEMS: ", cartItems);

  const deleteItemHandler = () => {
    dispatch({ type: "DELETE_ITEM", payload });
  };

  const sendOrderHandler = () => {
    dispatchEvent({ type: "SEND_ORDER", payload: state.cartReducer });
  };

  return (
    <div>
      <h1>I am a checkout page</h1>
      <h3>Items in Cart</h3>
      <div>
        {cartItems.map((item) => (
          <div key={item.id}>
            <p>{item.name}</p>
            <ul>
              <li>{item.description}</li>
            </ul>
            <button onClick={deleteItemHandler}>Delete</button>
          </div>
        ))}
        <div>Running Total: {cartTotal}</div>
      </div>
      <button onClick={sendOrderHandler}>Place Order</button>
    </div>
  );
};

export default Checkout;

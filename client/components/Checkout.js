import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ShippingInformation from "./ShippingInformation";
import BillInformation from "./BillingInformation";
import "./styles/Checkout.css";

const Checkout = () => {
  const dispatch = useDispatch();
  const { cartItems, cartTotal } = useSelector((state) => state.cartReducer);

  console.log("CART ITEMS: ", cartItems);

  const deleteItemHandler = (event) => {
    dispatch({ type: "DELETE_ITEM", payload: event.target.value.id });
  };

  const sendOrderHandler = () => {
    dispatchEvent({ type: "SEND_ORDER", payload: state.cartReducer });
  };

  return (
    <div className="checkout-container">
      <div className="checkout-items-display">
        <h3>Items in Cart</h3>
        <div>
          {cartItems.map((item) => (
            <div key={item.id} value={item}>
              <p>{item.name}</p>
              <ul>
                <li>{item.description}</li>
                <li>{item.price}</li>
              </ul>
              <button onClick={deleteItemHandler}>Delete Item</button>
            </div>
          ))}
          <div>Running Total: {cartTotal}</div>
        </div>
      </div>
      <div className="checkout-shippingBilling-container">
        <ShippingInformation />
        <BillInformation />
      </div>
      <button onClick={sendOrderHandler}>Place Order</button>
    </div>
  );
};

export default Checkout;

import React, { useContext } from "react";
import CartContext from "../store/cart";
import "./styles/HeaderCartButton.css";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);

  return (
    <button className="cart-button" onClick={props.onClick}>
      <span>Cart</span>
      <span>1</span>
    </button>
  );
};

export default HeaderCartButton;

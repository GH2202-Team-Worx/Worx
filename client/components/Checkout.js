import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sendOrder } from '../store/cart';
import ShippingInformation from './ShippingInformation';
import BillInformation from './BillingInformation';
import './styles/Checkout.css';

const Checkout = () => {
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
  const dispatch = useDispatch();
  const { cartItems, cartTotal } = useSelector((state) => state.cartReducer);

  console.log('CART ITEMS: ', cartItems);

  const deleteItemHandler = (event) => {
    dispatch({ type: 'DELETE_ITEM', payload: event.target.value.id });
  };

  const sendOrderHandler = () => {
    dispatch(sendOrder(cartItems, cartTotal));
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
                <li>{`$${item.price}`}</li>
              </ul>
              <button onClick={deleteItemHandler}>Delete Item</button>
            </div>
          ))}
          <div>{`Running Total: $${cartTotal}`}</div>
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

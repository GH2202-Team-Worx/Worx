import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrder } from "../store/singleOrder";
import { updateOrder } from "../store/singleOrder";
import OrdersFilter from "./OrdersFilter";

const SingleOrder = (props) => {
  const dispatch = useDispatch();
  const order = useSelector((state) => {
    return state.orderReducer;
  });
  if (order.status) {
    console.log("ORDER", order);
  }
  const [status, setStatus] = useState(order.status);
  console.log("STATUS: ", status);
  const [shippingAddress, setShippingAddress] = useState(order.shippingAddress);
  const [paymentInfo, setPaymentInfo] = useState(order.paymentInfo);
  const [shippingAmt, setShippingAmt] = useState(order.shippingAmt);
  const [taxAmt, setTaxAmt] = useState(order.taxAmt);

  const orderId = props.match.params.orderId;
  useEffect(() => {
    dispatch(getOrder(orderId));
  }, []);

  const statusChangeHandler = (selectedStatus) => {
    setStatus(selectedStatus);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("ORDERID: ", orderId);
    const updatedOrderInfo = {
      orderId,
      status: status ? status : "Processing",
      shippingAddress: shippingAddress ? shippingAddress : "",
      paymentInfo: paymentInfo ? paymentInfo : "",
      shippingAmt: shippingAmt ? shippingAmt : "",
      taxAmt: taxAmt ? taxAmt : "",
    };
    dispatch(updateOrder(updatedOrderInfo, orderId));
  };

  return order.status ? (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Review/Edit Order</h2>
        <p>Order Id: {order.id}</p>
        <p>UserId: {order.userId}</p>
        <p>Status: </p>
        <OrdersFilter selected={status} onChangeFilter={statusChangeHandler} />
        <p>Shipping Address: </p>
        <input
          type="text"
          // placeholder={order.shippingAddress}
          value={shippingAddress}
          required
          onChange={setShippingAddress}
        />
        <p>Payment Information:</p>
        <input
          type="text"
          placeholder={order.paymentInfo}
          required
          onChange={(e) => {
            setPaymentInfo(e.target.value);
          }}
        />
        <p>Shipping Amount:</p>
        <input
          type="text"
          placeholder={order.shippingAmt}
          required
          onChange={(e) => {
            setShippingAmt(e.target.value);
          }}
        />
        <p>Tax Amount:</p>
        <input
          type="text"
          placeholder={order.taxAmt}
          required
          onChange={(e) => {
            setTaxAmt(e.target.value);
          }}
        />
        <button type="submit">Submit Changes</button>
      </form>
    </div>
  ) : (
    "Loading order"
  );
};

export default SingleOrder;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getOrder } from "../store/singleOrder";
import { updateOrder } from "../store/singleOrder";
import OrdersFilter from "./OrdersFilter";
import "./styles/SingleOrder.css";

const SingleOrder = (props) => {
  const dispatch = useDispatch();
  const order = useSelector((state) => {
    return state.orderReducer;
  });
  console.log("ORDER: ", order, typeof order);

  const [status, setStatus] = useState(order.status);
  // const [shippingAddress, setShippingAddress] = useState(order.shippingAddress);
  // const [paymentInfo, setPaymentInfo] = useState(order.paymentInfo);
  // const [shippingAmt, setShippingAmt] = useState(order.shippingAmt);
  // const [taxAmt, setTaxAmt] = useState(order.taxAmt);

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

  return (
    <div>
      {Object.keys(order).length ? (
        <p>Loading</p>
      ) : (
        <form className="so-container" onSubmit={handleSubmit}>
          <h2 className="so-title">Review Order</h2>
          <p>Order Id: {order.id}</p>
          <p>UserId: {order.userId}</p>
          <p>Status: {order.status}</p>
          <p>Shipping Address:{order.shippingAddress}</p>
          <p>Payment Information: {order.paymentInfo}</p>
          <p>Shipping Amount: {order.shippingAmt}</p>
          <p>Tax Amount: {order.taxAmt}</p>
          <OrdersFilter
            selected={status}
            onChangeFilter={statusChangeHandler}
          />
          {/* <button type="submit">Submit Changes</button> */}
        </form>
      )}
      <Link className="return-link" to="/orders">
        Return to Orders
      </Link>
    </div>
  );
};

export default SingleOrder;

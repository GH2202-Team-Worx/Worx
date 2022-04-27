import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrder } from "../store/singleOrder";

const SingleOrder = (props) => {
  const dispatch = useDispatch();
  const order = useSelector((state) => {
    return state.orderReducer;
  });

  const orderId = props.match.params.orderId;

  useEffect(() => {
    dispatch(getOrder(orderId));
  }, []);

  return (
    <div>
      <div>OrderId: {order.id}</div>
      <div>Status: {order.status}</div>
      <div>Shipping Address: {order.shippingAddress}</div>
      <div>Payment Information: {order.paymentInfo}</div>
      <div>Shipping Amount: {order.shippingAmt}</div>
      <div>Tax Amount: {order.taxAmt}</div>
      <div>UserId: {order.userId}</div>
    </div>
  );
};

export default SingleOrder;

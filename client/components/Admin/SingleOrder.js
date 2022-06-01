import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getOrder } from "../../store/singleOrder";
import { updateOrder } from "../../store/singleOrder";
import AdminDashboard from "./AdminDash";
import "../styles/SingleOrder.css";

const SingleOrder = (props) => {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.orderReducer);
  const [status, setStatus] = useState(order.status);
  const orderId = props.match.params.orderId;

  useEffect(() => {
    dispatch(getOrder(orderId));
  }, []);

  const dropDownChangeHandler = (event) => {
    setStatus(event.target.value);
    dispatch(updateOrder({ ...order, status: event.target.value }, orderId));
  };

  return (
    <div>
      <AdminDashboard />
      {!Object.keys(order).length ? (
        <p>Loading</p>
      ) : (
        <div className="so-container">
          <h2 className="so-title">Review Order</h2>
          <p>Order Id: {order.id}</p>
          <p>UserId: {order.userId}</p>
          <p>Status: {order.status}</p>
          <p>Shipping Address:{order.shippingAddress}</p>
          <p>Payment Information: {order.paymentInfo}</p>
          <p>Shipping Amount: {order.shippingAmt}</p>
          <p>Tax Amount: {order.taxAmt}</p>
          <select
            className="category-dropdown"
            name="status"
            value={order.status}
            onChange={dropDownChangeHandler}
          >
            <option value="">Select status</option>
            <option value="Created">Created</option>
            <option value="Processing">Processing</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Shipped">Shipped</option>
            <option value="Completed">Completed</option>
          </select>
          {/* <button type="submit">Submit Changes</button> */}
        </div>
      )}
      <Link className="return-link" to="/orders">
        Return to Orders
      </Link>
    </div>
  );
};

export default SingleOrder;

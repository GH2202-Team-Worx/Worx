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

          <table>
            <tr>
              <td>Order Id:</td>
              <td>{order.id}</td>
            </tr>
            {/* <p>Order Id: {order.id}</p> */}
            <tr>
              <td>UserId:</td>
              <td>{order.userId}</td>
            </tr>
            {/* <p>UserId: {order.userId}</p> */}
            <tr>
              <td>Status:</td>
              <td>{order.status}</td>
            </tr>
            {/* <p>Status: {order.status}</p> */}
            <tr>
              <td>Shipping Address:</td>
              <td>{order.shippingAddress}</td>
            </tr>
            <tr>
              <td>Payment Information:</td>
              <td>{order.paymentInfo}</td>
            </tr>
            <tr>
              <td>Shipping Amount:</td>
              <td>{order.shippingAmt}</td>
            </tr>
            <tr>
              <td>Tax Amount:</td>
              <td>{order.shippingAmt}</td>
            </tr>
            {/* <p>Shipping Address:{order.shippingAddress}</p> */}
            {/* <p>Payment Information: {order.paymentInfo}</p> */}
            <p>Shipping Amount: {order.shippingAmt}</p>
            <p>Tax Amount: {order.taxAmt}</p>
          </table>

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

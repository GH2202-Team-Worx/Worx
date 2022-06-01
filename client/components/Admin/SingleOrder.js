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
    <div className="so-container">
      <AdminDashboard />
      {!Object.keys(order).length ? (
        <p>Loading</p>
      ) : (
        <div className="so-table">
          <h2 className="so-title">Review Order</h2>

          <table className="so-table">
            <tbody>
              <tr>
                <td>Order Id:</td>
                <td>{order.id}</td>
              </tr>

              <tr>
                <td>UserId:</td>
                <td>{order.userId}</td>
              </tr>

              <tr>
                <td>Status:</td>
                <td>{order.status}</td>
              </tr>

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
            </tbody>
          </table>
          <label>Change Order Status</label>
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

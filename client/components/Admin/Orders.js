import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrders } from "../../store/orders";
import OrdersFilter from "./OrdersFilter";
import AdminDashboard from "./AdminDash";
import { Accordion } from "react-bootstrap";
import "../styles/Orders.css";

const Orders = (props) => {
  const dispatch = useDispatch();
  const [filterStatus, setFilterStatus] = useState("");
  const currentOrders = useSelector((state) =>
    state.ordersReducer.filter((order) => order.status !== "Cart")
  );

  useEffect(() => {
    const { data } = dispatch(getOrders());
  }, []);

  const filterChangeHandler = (selectedStatus) => {
    setFilterStatus(selectedStatus);
  };

  const ordersToShow = () => {
    if (filterStatus) {
      const filteredOrders = currentOrders.filter(
        (order) => order.status === filterStatus
      );
      return filteredOrders;
    } else {
      return currentOrders;
    }
  };

  return (
    <div className="orders-main">
      <AdminDashboard />
      <div className="orders-container">
        <OrdersFilter
          selected={filterStatus}
          onChangeFilter={filterChangeHandler}
        />
        <h3 className="view-orders-title">View Orders</h3>
        <div className="orders-items-container">
          <Accordion>
            {ordersToShow().length === 0 ? (
              <p>No current orders.</p>
            ) : (
              ordersToShow().map((order) => {
                return (
                  <Accordion.Item
                    id="order-item"
                    eventKey={order.id}
                    key={order.id}
                  >
                    <Accordion.Header>
                      <strong>Order No. : {order.id}</strong>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div>
                        <strong>Status:</strong> {order.status}
                      </div>
                      <div>{order.shippingAddress}</div>
                      <div>{order.paymentInfo}</div>
                      <div>{order.shippingAmt}</div>
                      <div>{order.taxAmt}</div>
                      <Link to={`/orders/${order.id}`}>View Order</Link>
                    </Accordion.Body>
                  </Accordion.Item>
                );
              })
            )}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Orders;

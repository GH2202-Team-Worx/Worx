import React, { useState } from "react";
import "../styles/Filter.css";

const OrdersFilter = (props) => {
  const dropDownChangeHandler = (event) => {
    props.onChangeFilter(event.target.value);
  };

  return (
    <div>
      <select
        className="category-dropdown"
        name="status"
        value={props.selected}
        onChange={dropDownChangeHandler}
      >
        <option value="">Filter by status</option>
        <option value="Created">Created</option>
        <option value="Processing">Processing</option>
        <option value="Cancelled">Cancelled</option>
        <option value="Shipped">Shipped</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
};

export default OrdersFilter;

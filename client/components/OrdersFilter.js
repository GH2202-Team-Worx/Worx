import React, { useState } from "react";

const OrdersFilter = (props) => {
  const dropDownChangeHandler = (event) => {
    console.log("EVENT: ", event.target.value);
    props.onChangeFilter(event.target.value);
  };

  return (
    <div>
      <label htmlFor="status-select">Status:</label>
      <select
        name="status"
        value={props.selected}
        onChange={dropDownChangeHandler}
      >
        <option value="test">Please choose an option</option>
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

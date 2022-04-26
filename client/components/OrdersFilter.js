import React from "react";

const OrdersFilter = (props) => {
  const dropDownChangeHandler = (event) => {
    props.onChangeFilter(event.target.value);
  };

  return (
    <div>
      <label htmlFor="status-select">Check orders by status:</label>
      <select
        name="status"
        value={props.selected}
        onChange={dropDownChangeHandler}
      >
        <option value="">Please choose an option</option>
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

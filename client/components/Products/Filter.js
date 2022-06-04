import React from "react";
import "../styles/Filter.css";

const Filter = (props) => {
  const dropDownChangeHandler = (event) => {
    props.onChangeFilter(event.target.value);
  };

  return (
    <div>
      <label className="filter-label">Filter by category/price: </label>
      <select
        className="category-dropdown"
        name="category"
        value={props.selected}
        onChange={dropDownChangeHandler}
      >
        <option value="">Select an option</option>
        <option value="Bowl">Bowl</option>
        <option value="Bowl set">Bowl Set</option>
        <option value="Goblet">Goblet</option>
        <option value="Vase">Vase</option>
        <option value="Box">Box</option>
        <option value="Cutting board">Cutting Board</option>
        <option value="low">Price: low to high</option>
        <option value="high">Price: high to low</option>
      </select>
    </div>
  );
};

export default Filter;

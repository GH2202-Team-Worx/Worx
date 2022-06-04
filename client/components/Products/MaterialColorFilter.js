import React from "react";
import "../styles/Filter.css";

const MaterialColorFilter = (props) => {
  const dropDownChangeHandler = (event) => {
    props.onChange(event.target.value);
  };

  // Materials: "Poplar" "Hickory" "Spalted Oak" "live oak" "olive tree" "Pecan" "Spalted Pecan" "Black Walnut"
  return (
    <div>
      <label className="material-label">Filter by material: </label>
      <select
        className="material-dropdown"
        name="material"
        value={props.selected}
        onChange={dropDownChangeHandler}
      >
        <option value="">Choose a material</option>
        <option value="Poplar">Poplar</option>
        <option value="Hickory">Hickory</option>
        <option value="Live Oak">Live Oak</option>
        <option value="Olive Tree">Olive Tree</option>
        <option value="Pecan">Pecan</option>
        <option value="Black Walnut">Black Walnut</option>
        <option value="Spaulted Oak">Spaulted Oak</option>
        <option value="Spaulted Pecan">Spaulted Pecan</option>
      </select>
    </div>
  );
};

export default MaterialColorFilter;

import React from "react";

const Filter = (props) => {
  const dropDownChangeHandler = (event) => {
    props.onChangeFilter(event.target.value);
  };

  return (
    <div>
      <label htmlFor="category-select">Choose a category:</label>
      <select
        name="category"
        value={props.selected}
        onChange={dropDownChangeHandler}
      >
        <option value="">Please choose an option</option>
        <option value="Bowl">Bowl</option>
        <option value="Bowl set">Bowl Set</option>
        <option value="Goblet">Goblet</option>
        <option value="Box">Box</option>
        <option value="Board">Board</option>
      </select>
    </div>
  );
};

export default Filter;

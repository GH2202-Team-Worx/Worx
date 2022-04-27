import React from 'react';

//sending to the order db
//router post cart

//there is no onSubmit because shipping is ultimately submitted when the order is placed on the checkout component

const ShippingInformation = (props) => {
  const { shipping, setShipping } = props;

  const handleChange = (evt) => {
    setShipping({ ...shipping, [evt.target.name]: evt.target.value });
  };

  return (
    <div className="checkout-shipping-container">
      <h3>Shipping Information</h3>
      <div>So we can ship you our beautiful products!</div>
      <form>
        <label htmlFor="phoneNumber">
          <small>Phone Number</small>
        </label>
        <input
          name="phone"
          id="phone"
          type="tel"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          onChange={handleChange}
        />
        <label htmlFor="shipName">
          <small>Name</small>
        </label>
        <input
          name="shipName"
          id="shipName"
          type="text"
          onChange={handleChange}
        />
        <label htmlFor="address">
          <small>Street Address</small>
        </label>
        <input name="street" id="street" type="text" onChange={handleChange} />
        <label htmlFor="address">
          <small>{'Street Address (Apt/Suite No.)'}</small>
        </label>
        <input name="street" id="street" type="text" onChange={handleChange} />
        <label htmlFor="city">
          <small>City</small>
        </label>
        <input name="city" id="city" type="text" onChange={handleChange} />
        <label htmlFor="state">
          <small>State</small>
        </label>
        <input name="state" id="state" type="text" onChange={handleChange} />
        <label htmlFor="zipCode">
          <small>Zipcode</small>
        </label>
        <input
          name="zipCode"
          id="zipCode"
          type="number"
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default ShippingInformation;

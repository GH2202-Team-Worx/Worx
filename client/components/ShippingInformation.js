import React from 'react';

//sending to the order db

const ShippingInformation = (props) => {
  return (
    <div className="checkout-shipping-container">
      <h3>Shipping Information</h3>
      <div>So we can ship you our beautiful products!</div>
      <label htmlFor="phoneNumber">
        <small>Phone Number</small>
      </label>
      <input
        name="phone"
        id="phone"
        type="tel"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
      />
      <label htmlFor="address">
        <small>Street Address</small>
      </label>
      <input name="street" id="street" type="text" />
      <label htmlFor="address">
        <small>{'Street Address (Apt/Suite No.)'}</small>
      </label>
      <input name="street" id="street" type="text" />
      <label htmlFor="city">
        <small>City</small>
      </label>
      <input name="city" id="city" type="text" />
      <label htmlFor="state">
        <small>State</small>
      </label>
      <input name="state" id="state" type="text" />
      <label htmlFor="zipCode">
        <small>Zipcode</small>
      </label>
      <input name="zipCode" id="zipCode" type="number" />
    </div>
  );
};

export default ShippingInformation;

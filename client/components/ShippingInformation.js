import React from "react";
import "./styles/ShippingInformation.css";
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
        <div className="phone-name">
          <div className="ship-name">
            {/* <label htmlFor="shipName">
              <small>Name</small>
            </label> */}
            <input
              name="shipName"
              id="shipName"
              type="text"
              placeholder="Name"
              onChange={handleChange}
            />
          </div>
          <div className="ship-phoneNumber">
            {/* <label htmlFor="phoneNumber">
              <small>Phone Number</small>
            </label> */}
            <input
              name="phone"
              id="phone"
              type="tel"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              placeholder="123-456-7890"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="street-address">
          {/* <label htmlFor="address">
            <small>Street Address</small>
          </label> */}
          <input
            name="street"
            id="street"
            type="text"
            placeholder="Street Address"
            onChange={handleChange}
          />
          {/* <label htmlFor="address">
            <small>{"Street Address (Apt/Suite No.)"}</small>
          </label> */}
          <input
            name="street"
            id="street"
            type="text"
            placeholder="Street Address (Apt/Suite No.)"
            onChange={handleChange}
          />
        </div>

        <div className="city-state-zip">
          <div>
            {/* <label htmlFor="city">
              <small>City</small>
            </label> */}
            <input
              name="city"
              id="city"
              type="text"
              placeholder="City"
              className="city"
              onChange={handleChange}
            />
          </div>
          <div>
            {/* <label htmlFor="state">
              <small>State</small>
            </label> */}
            <input
              name="state"
              id="state"
              type="text"
              placeholder="State"
              className="state"
              onChange={handleChange}
            />
          </div>
          <div>
            {/* <label htmlFor="zipCode">
              <small>Zipcode</small>
            </label> */}
            <input
              name="zipCode"
              id="zipCode"
              type="number"
              placeholder="Zipcode"
              className="zipcode"
              onChange={handleChange}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ShippingInformation;

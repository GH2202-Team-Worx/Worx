import React from 'react';

//stripejs
//this shouldn't be kept on db without encryption

const BillingInformation = (props) => {
  return (
    <div>
      <h3>Billing Information</h3>
      <label htmlFor="creditCard-name">
        <small>Name on Card</small>
      </label>
      <input name="creditCard" id="creditCard" type="text" />
      <label htmlFor="creditCard">
        <small>Credit Card Number</small>
      </label>
      <input name="creditCard" id="creditCard" type="text" />
      <label htmlFor="expiration-date">
        <small>Expiration Date</small>
      </label>
      <input name="creditCard" id="expiration-date" type="text" />
      <label htmlFor="CVC">
        <small>CVC</small>
      </label>
      <input name="creditCard" id="CVC" type="text" />
    </div>
  );
};

export default BillingInformation;

import React from 'react';

//there is no onSubmit because billing is ultimately submitted when the order is placed on the checkout component
//stripejs
//this shouldn't be kept on db without encryption

const BillingInformation = (props) => {
  const { billing, setBilling } = props;

  const handleChange = (evt) => {
    setBilling({ ...billing, [evt.target.name]: evt.target.value });
  };

  return (
    <div>
      <h3>Billing Information</h3>
      <form>
        <label htmlFor="creditCard-name">
          <small>Name on Card</small>
        </label>
        <input
          name="name"
          id="creditCard"
          type="text"
          onChange={handleChange}
        />
        <label htmlFor="creditCard">
          <small>Credit Card Number</small>
        </label>
        <input name="ccn" id="creditCard" type="text" onChange={handleChange} />
        <label htmlFor="expiration-date">
          <small>Expiration Date</small>
        </label>
        <input
          name="expiry"
          id="expiration-date"
          type="text"
          onChange={handleChange}
        />
        <label htmlFor="CVC">
          <small>CVC</small>
        </label>
        <input name="cvc" id="CVC" type="text" onChange={handleChange} />
      </form>
    </div>
  );
};

export default BillingInformation;

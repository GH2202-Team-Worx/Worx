import React from 'react';

const Contact = () => {
  return (
    <div>
      <h1>Contact Us</h1>
      <p>We'd love to hear from you!</p>
      <p>
        Please feel free to contact us via phone, email, or the contact form
        below. If contacting us about an order, kindly include your order
        number. We will get back to you within 3-5 days via email. If the issue
        is more urgent, you will receive a quicker reply via phone.
      </p>
      <p>Email: bellscustomworx@gmail.com</p>
      <p>Phone number: (843) 534-8946</p>

      <form>
        <label>
          * Email:
          <input type="text" name="email" />
        </label>
        <label>
          * Subject:
          <input type="text" name="email" />
        </label>
        <label>
          * Message:
          <input type="text" name="email" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Contact;

//TODO:
//1. make stars red in CSS
//2. make h1 smaller

//make react component on the frontend -
//  instructions on sending email. mention order # if referring to an order. should hear back to 2-3 days (??)
//  react form with contact information(name, email, message)
//  set local state for name email and message.
//  when sending, submit button can change to sending...
//  **put front end checks in to make sure none of the boxes are empty when sending and email is a valid email

//send email on backend -
//  after email is sent, the frontend can change to either a success component ("Thank you for contacting us. You should hear back within x amt of days") or a failed to send component

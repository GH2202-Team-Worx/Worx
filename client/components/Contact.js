import React from 'react';

const Contact = () => {
  return <h1>I am a contact page</h1>;
};

export default Contact;

//make react component on the frontend -
//  instructions on sending email. mention order # if referring to an order. should hear back to 2-3 days (??)
//  react form with contact information(name, email, message)
//  set local state for name email and message.
//  when sending, submit button can change to sending...
//  **put front end checks in to make sure none of the boxes are empty when sending and email is a valid email

//send email on backend -
//  after email is sent, the frontend can change to either a success component ("Thank you for contacting us. You should hear back within x amt of days") or a failed to send component

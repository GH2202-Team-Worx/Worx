import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const sendEmail = async (evt) => {
    try {
      evt.preventDefault();
      if (!email || !subject || !message) {
        alert('Email, subject, and message are required!');
      } else if (!email.includes('@') || !email.includes('.')) {
        alert('Must enter a valid email');
      } else {
        console.log('💌 SENDING FORM MADE THIS EXECUTE');
        //unsure of this next line. cannot be tested until emailjs is functioning
        // await emailjs.sendForm(/*SERVICE-ID, TEMPLATE_ID, evt.target, USER_ID*/);
        setEmail('');
        setSubject('');
        setMessage('');
      }
    } catch (err) {
      console.error(err);
      return (
        <div id="contact-err">
          <p>The message failed to send. Please try again</p>
          <Contact />
        </div>
      );
    }
  };

  const handleChange = (evt) => {
    if (evt.target.name === 'email') setEmail(evt.target.value);
    if (evt.target.name === 'subject') setSubject(evt.target.value);
    if (evt.target.name === 'message') setMessage(evt.target.value);
  };

  return (
    <div id="contact-us">
      <h1>We'd love to hear from you!</h1>
      <p>
        Please feel free to contact us via phone, email, or the contact form
        below. If contacting us about an order, kindly include your order
        number. We will get back to you within 3-5 days via email. If the issue
        is more urgent, you will receive a quicker reply via phone.
      </p>
      <p>Email: bellscustomworx@gmail.com</p>
      <p>Phone number: (843) 534-8946</p>

      <form onSubmit={sendEmail}>
        <label>
          Email*
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </label>
        <label>
          Subject*
          <input
            type="text"
            name="subject"
            value={subject}
            onChange={handleChange}
          />
        </label>
        <label>
          Message*
          <textarea
            type="textarea"
            name="message"
            value={message}
            onChange={handleChange}
          />
        </label>
        <button type="submit">
          <img />
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;

//TODO:
//1. make stars red in CSS
//2. make submit button green with a little picture of a letter to the left of it (maybe make add to cart button blue?)
//3. make error message red if contact form fails to send
//4. change the alerts to messages in red that show up

//make react component on the frontend -
//  instructions on sending email. mention order # if referring to an order. should hear back to 2-3 days (??)
//  react form with contact information(name, email, message)
//  set local state for name email and message.
//  when sending, submit button can change to sending...
//  **put front end checks in to make sure none of the boxes are empty when sending and email is a valid email

//email sends on frontend using emailjs-com (nodemailer can be used on backend if decided on or useful in another part) -
//  after email is sent, the frontend can change to either a success component ("Thank you for contacting us. You should hear back within x amt of days") or a failed to send component

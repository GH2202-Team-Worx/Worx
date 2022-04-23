import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './styles/contact.css';

const Contact = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (evt) => {
    if (evt.target.name === 'email') setEmail(evt.target.value);
    if (evt.target.name === 'subject') setSubject(evt.target.value);
    if (evt.target.name === 'message') setMessage(evt.target.value);
  };

  const sendEmail = async (evt) => {
    evt.preventDefault();
    if (!email || !subject || !message) {
      alert('Email, subject, and message are required!');
    } else if (!email.includes('@') || !email.includes('.')) {
      alert('Must enter a valid email');
    } else {
      try {
        const response = await emailjs.sendForm(
          'service_msucc8a',
          'template_kms7f6e',
          evt.target,
          'hiX-yiEKPs0JeFpQY'
        );
        console.log('SUCCESS!', response.status, response.text);
        setEmail('');
        setSubject('');
        setMessage('');
      } catch (err) {
        console.error('FAILED...', err);
        alert('Message failed to send. Please try again');
      }
    }
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
      <div className="contact-info">
        <p>Email: bellscustomworx@gmail.com</p>
        <p>Phone number: (843) 534-8946</p>
      </div>

      <form id="contact-form" onSubmit={sendEmail}>
        <label>
          Email<span className="required">*</span>
        </label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <label>
          Subject<span className="required">*</span>
        </label>
        <input
          type="text"
          name="subject"
          value={subject}
          onChange={handleChange}
        />
        <label>
          Message<span className="required">*</span>
        </label>
        <textarea
          type="textarea"
          name="message"
          value={message}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
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
//5. add a msg that comes up after successfully sending mail that says "Thank you for contacting us!"

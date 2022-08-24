import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createNewUser } from '../../store/users';
import '../styles/SignUpForm.css';

const SignupForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confPassword) {
      alert('Passwords do not match.');
    } else {
      alert(
        'A sign up form was submitted with first name: "' +
          firstName +
          '" last name: "' +
          lastName +
          '" and Email :"' +
          email +
          '"'
      );
      dispatch(
        createNewUser({ firstName, lastName, email, password }, history)
      );
    }
  };

  return (
    <div className="signup-form">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }} className="signup-form-container"
      >
        <div>
          <h2>Sign Up Form</h2>
          <div className="signup-content">
            <div>
              <div>
                <label htmlFor="firstName">
                  <small>First Name</small>
                </label>
                <input
                  value={firstName}
                  type="text"
                  required
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <label htmlFor="lastName">
                  <small>Last Name</small>
                </label>
                <input
                  value={lastName}
                  type="text"
                  required
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <label htmlFor="email">
                <small>E-mail:</small>
              </label>
              <input
                value={email}
                type="text"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="signup-password-container">
              <label htmlFor="password">
                <small>Password:</small>
              </label>
              <input
                value={password}
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="confPassword">
                <small>Confirm Password: </small>
              </label>
              <input
                value={confPassword}
                type="password"
                required
                onChange={(e) => setConfPassword(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;

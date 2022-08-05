import React from 'react';
import { useDispatch } from 'react-redux';
import { authenticate } from '../../store';
import '../styles/LoginForm.css';

const LoginForm = (props) => {
  const dispatch = useDispatch();
  const { error } = props;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const email = evt.target.email.value;
    const password = evt.target.password.value;
    dispatch(authenticate(email, password, formName));
  };

  return (
    <React.Fragment>
      <form id="login-form" name="login" onSubmit={handleSubmit}>
        <h2> Login Form</h2>
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
        <div>
          <p>Don't have an account? Create one today! 😊</p>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </React.Fragment>
  );
};

export default LoginForm;

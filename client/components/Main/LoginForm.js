import React from "react";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { authenticate } from "../../store";
import "../styles/LoginForm.css";

/**
 * COMPONENT
 */
const LoginForm = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { error } = props;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const email = evt.target.email.value;
    const password = evt.target.password.value;
    dispatch(authenticate(email, password, formName));
  };
  // need to check if user is admin, if so need to make new page where admins can see all orders placed
  // get user id
  return (
    <div>
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
    </div>
  );
};

export default LoginForm;
/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */

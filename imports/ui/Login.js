import React from 'react';
import { NavLink } from 'react-router-dom';

export default class Login extends React.Component {
  render() {
    return (
      <div>
        <h1>Login to Short Link</h1>
        <span>login form here</span>
        <NavLink to="/signup">Have an account?</NavLink>
      </div>
    );
  }
}

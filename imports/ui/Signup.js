import React from 'react';
import { NavLink } from 'react-router-dom';

export default class Signup extends React.Component {
  render() {
    return (
      <div>
        <p>Signup</p>
        <NavLink to="/">Already have an account?</NavLink>
      </div>
    );
  }
}

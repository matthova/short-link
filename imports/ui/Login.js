import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { NavLink } from 'react-router-dom';
import autobind from 'react-autobind';
import { Meteor } from 'meteor/meteor';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
    };

    autobind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const email = this.email.value.trim();
    const password = this.password.value.trim();

    Meteor.loginWithPassword({ email }, password, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '' });
        this.props.history.push('/links');
      }
    });
  }

  render() {
    return (
      <div>
        <h1>Login to Short Link</h1>
        {this.state.error
          ? <p>
            {this.state.error}
          </p>
          : null}
        <form onSubmit={this.onSubmit}>
          <input
            type="email"
            ref={(email) => {
              this.email = email;
            }}
            name="email"
            placeholder="Email"
          />
          <input
            type="password"
            ref={(password) => {
              this.password = password;
            }}
            name="password"
            placeholder="Password"
          />
          <button>Login</button>
        </form>

        <NavLink to="/signup">Have an account?</NavLink>
      </div>
    );
  }
}

Login.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

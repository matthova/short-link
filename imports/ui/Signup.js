import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import autobind from 'react-autobind';
import { Accounts } from 'meteor/accounts-base';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      signupSuccess: false,
    };

    autobind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const email = this.email.value.trim();
    const password = this.password.value.trim();

    Accounts.createUser({ email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', signupSuccess: true });
      }
    });
  }

  render() {
    console.log('rendering signup');

    if (this.state.signupSuccess) {
      console.log('redirect');
      return <Redirect to="/links" />;
    }

    return (
      <div>
        <p>Join Short Link</p>

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
          <button>Create Account</button>
        </form>

        <NavLink to="/">Already have an account?</NavLink>
      </div>
    );
  }
}

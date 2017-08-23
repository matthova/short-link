import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Accounts } from 'meteor/accounts-base';
import autobind from 'react-autobind';

export default class Links extends React.Component {
  constructor(props) {
    super(props);

    autobind(this);
  }

  onLogout() {
    Accounts.logout(() => {
      this.props.history.push('/');
    });
  }

  render() {
    return (
      <div>
        <p>Links</p>
        <button onClick={this.onLogout}>Logout</button>
      </div>
    );
  }
}

Links.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

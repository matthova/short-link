import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Redirect } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import autobind from 'react-autobind';

export default class Links extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      logout: false,
    };

    autobind(this);
  }

  onLogout() {
    Accounts.logout(() => {
      this.setState({ logout: true });
    });
  }

  render() {
    if (this.state.logout) {
      return <Redirect to={{ pathname: '/' }} />;
    }
    return (
      <div>
        <p>Links</p>
        <button onClick={this.onLogout}>Logout</button>
      </div>
    );
  }
}

Links.propTypes = {
  history: ReactRouterPropTypes.history,
};

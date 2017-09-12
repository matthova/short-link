import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Redirect } from 'react-router-dom';
import autobind from 'react-autobind';

import { Links } from '../api/links';

import LinksList from './LinksList';

export default class Link extends React.Component {
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

  createLink(e) {
    e.preventDefault();

    const url = this.url.value.trim();

    if (url) {
      Meteor.call('links.insert', url, (error, response) => {
        if (error) {
          console.log(error.reason);
        } else {
          this.url.value = '';
        }
      });
    }
  }

  render() {
    if (this.state.logout) {
      return <Redirect to={{ pathname: '/' }} />;
    }
    return (
      <div>
        <p>Links</p>
        <button onClick={this.onLogout}>Logout</button>
        <form onSubmit={this.createLink}>
          <input type="text" ref={url => (this.url = url)} placeholder="URL" />
          <input type="submit" value="Add Link" />
        </form>
        <LinksList />
      </div>
    );
  }
}

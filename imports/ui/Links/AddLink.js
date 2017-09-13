import React from 'react';
import { Meteor } from 'meteor/meteor';
import autobind from 'react-autobind';

export default class AddLink extends React.Component {
  constructor(props) {
    super(props);

    autobind(this);
  }

  createLink(e) {
    e.preventDefault();

    const url = this.url.value.trim();

    if (url) {
      Meteor.call('links.insert', url, (error, response) => {
        if (error) {
          console.error(error);
        } else {
          this.url.value = '';
        }
      });
    }
  }

  render() {
    return (
      <form onSubmit={this.createLink}>
        <input type="text" ref={url => (this.url = url)} placeholder="URL" />
        <input type="submit" value="Add Link" />
      </form>
    );
  }
}

import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';

export default class Link extends React.Component {
  constructor(props) {
    super(props);

    autobind(this);
  }

  deleteLink(e) {
    e.preventDefault();

    // Add logic here for deleting the link object from the database
  }

  render() {
    return (
      <div>
        <p>{this.props.url}</p>
        <button onClick={this.deleteLink}>x</button>
      </div>
    );
  }
}

Link.propTypes = {
  url: PropTypes.string.isRequired,
};

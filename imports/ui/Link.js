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

    Meteor.call('links.remove', this.props._id, (error, response) => {
      if (error) {
        // Same convention as above with errors :)
        alert(error.reason);
      } else {
        // If you're doing synchronous work on the server, you can get a result here.
      }
    });

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
  _id: PropTypes.string.isRequired,
};

import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import Clipboard from 'clipboard';

export default class Link extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      copyState: 'Copy',
    };

    autobind(this);
  }

  componentDidMount() {
    this.clipboard = new Clipboard(this.copyButton);
    clipboard.on('success', () => {
      this.setState({ copyState: 'Copied' });
      setTimeout(() => {
        this.setState({ copyState: 'Copy' });
      }, 500);
    });
    clipboard.on('error', () => {
      alert('Unable to copy. Please manually copy the link');
    });
  }

  componentWillUnmount() {
    this.clipboard.destroy();
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
        <p>Url: {this.props.url}</p>
        <p>Short URL: {this.props.shortUrl}</p>
        <button
          ref={(copyButton) => {
            this.copyButton = copyButton;
          }}
          data-clipboard-text={this.props.shortUrl}
        >
          {this.state.copyState}
        </button>
        <button onClick={this.deleteLink}>x</button>
      </div>
    );
  }
}

Link.propTypes = {
  url: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  shortUrl: PropTypes.string.isRequired,
};

import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import Clipboard from 'clipboard';
import moment from 'moment';

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
    this.clipboard.on('success', () => {
      this.setState({ copyState: 'Copied' });
      setTimeout(() => {
        this.setState({ copyState: 'Copy' });
      }, 500);
    });
    this.clipboard.on('error', () => {
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

  toggleVisible(e) {
    e.preventDefault();

    Meteor.call('links.toggleVisiblity', this.props._id, !this.props.visible, (error, response) => {
      if (error) {
        alert(error.reason);
      } else {
      }
    });
  }

  renderStats() {
    let visitMessage = this.props.visitedCount === 1 ? 'visit' : 'visits';

    if (typeof this.props.lastVisitedAt === 'number') {
      visitMessage += ` - (visited ${moment(this.props.lastVisitedAt).fromNow()})`;
    }

    return `${this.props.visitedCount} ${visitMessage}`;
  }

  render() {
    return (
      <div>
        <p>{this.props.url}</p>
        <p>{this.props.shortUrl}</p>
        <p>{this.props.visible.toString()}</p>
        <p>{this.renderStats()}</p>
        <button
          ref={(copyButton) => {
            this.copyButton = copyButton;
          }}
          data-clipboard-text={this.props.shortUrl}
        >
          {this.state.copyState}
        </button>
        <div>
          <button onClick={this.toggleVisible}>{this.props.visible ? 'Hide' : 'Unhide'}</button>
        </div>
        <button onClick={this.deleteLink}>x</button>
      </div>
    );
  }
}

Link.propTypes = {
  url: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  shortUrl: PropTypes.string.isRequired,
  visitedCount: PropTypes.number.isRequired,
  lastVisitedAt: PropTypes.number,
};

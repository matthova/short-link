import React from 'react';
import { Meteor } from 'meteor/meteor';
import autobind from 'react-autobind';
import Modal from 'react-modal';

export default class AddLink extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '',
      isOpen: false,
      error: '',
    };

    autobind(this);
  }

  createLink(e) {
    e.preventDefault();

    const { url } = this.state;

    Meteor.call('links.insert', url, (error, response) => {
      if (error) {
        this.setState({ error: error.reason });
      } else {
        this.closeModal();
      }
    });
  }

  onUrlChange(e) {
    this.setState({
      url: e.target.value,
    });
  }

  closeModal() {
    this.setState({ isOpen: false, error: '', url: '' });
  }

  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.setState({ isOpen: true });
          }}
        >
          + Add Link{' '}
        </button>
        <Modal
          onAfterOpen={() => {
            this.url.focus();
          }}
          onRequestClose={this.closeModal}
          isOpen={this.state.isOpen}
          contentLabel="Add link"
        >
          <h1>Add Link</h1>
          {this.state.error ? <p>{this.state.error}</p> : null}
          <form onSubmit={this.createLink}>
            <input
              type="text"
              placeholder="URL"
              value={this.state.url}
              onChange={this.onUrlChange}
              ref={url => (this.url = url)}
            />
            <input type="submit" value="Add Link" />
          </form>
          <button onClick={this.closeModal}>Close Modal</button>
        </Modal>
      </div>
    );
  }
}

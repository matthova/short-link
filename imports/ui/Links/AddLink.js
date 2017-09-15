import React from 'react';
import { Meteor } from 'meteor/meteor';
import autobind from 'react-autobind';

export default class AddLink extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '',
    };

    autobind(this);
  }

  createLink(e) {
    e.preventDefault();

    const { url } = this.state;

    if (url) {
      Meteor.call('links.insert', url, (error, response) => {
        if (error) {
          console.error(error);
        } else {
          this.setState({ url: '' });
        }
      });
    }
  }

  onUrlChange(e) {
    this.setState({
      url: e.target.value,
    });
  }

  render() {
    return (
      <form onSubmit={this.createLink}>
        <input type="text" placeholder="URL" value={this.state.url} onChange={this.onUrlChange} />
        <input type="submit" value="Add Link" />
      </form>
    );
  }
}

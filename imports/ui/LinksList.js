import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import { Links } from '../api/links';

export default class LinksList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      links: [],
    };
  }

  componentDidMount() {
    Tracker.autorun(() => {
      Meteor.subscribe('links');
      const links = Links.find().fetch();
      this.setState({ links });
    });
  }

  componentWillUnmount() {
    console.log('component links list will unmount');
  }

  renderLinksListItems() {
    const links = this.state.links.map(link => <p key={link._id}>{link.url}</p>);
    return <div>{links}</div>;
  }

  render() {
    return (
      <div>
        <p>Links List</p>
        {this.renderLinksListItems()}
      </div>
    );
  }
}

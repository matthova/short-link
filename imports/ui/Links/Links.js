import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import { Links } from '../../api/links';
import Link from './Link';

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

  renderLinksListItems() {
    return this.state.links.map((link) => {
      const shortUrl = Meteor.absoluteUrl(link._id);
      return <Link key={link._id} shortUrl={shortUrl} {...link} />;
    });
  }

  render() {
    return (
      <div>
        <p>Links List</p>
        <div>{this.renderLinksListItems()}</div>
      </div>
    );
  }
}

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import FlipMove from 'react-flip-move';
import { Links } from '../../api/links';
import Link from './Link';

export default class LinksList extends React.Component {
  constructor(props) {
    super(props);

    this.updateDelay = 10;

    this.state = {
      links: [],
      lastUpdated: new Date().getTime(),
    };
  }

  componentDidMount() {
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe('links');
      const links = Links.find({
        visible: Session.get('showVisible'),
      }).fetch();

      // When a new link is created
      // optimistic loading momentarily creates the illusion that 2 links are created
      // To deal with this, we compare the current time with the time that the new links were provided
      // If an update happens prior to the timeout function being called, then the state will be updated by the later callback
      setTimeout(() => {
        const currentTime = new Date().getTime();
        if (currentTime - this.state.lastUpdated >= this.updateDelay) {
          this.setState({ links });
        }
      }, this.updateDelay);

      this.setState({ lastUpdated: new Date().getTime() });
    });
  }

  componentWillUnmount() {
    this.linksTracker.stop();
  }

  renderLinksListItems() {
    if (this.state.links.length === 0) {
      return (
        <div className="item">
          <p className="item__status-message">No Links Found</p>
        </div>
      );
    }
    return this.state.links.map((link) => {
      const shortUrl = Meteor.absoluteUrl(link._id);
      return <Link key={link._id} shortUrl={shortUrl} {...link} />;
    });
  }

  render() {
    return (
      <div>
        <FlipMove maintainContainerHeight>{this.renderLinksListItems()}</FlipMove>
      </div>
    );
  }
}

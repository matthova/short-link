import React from 'react';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

export default class LinkFilters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showVisible: true,
    };
  }

  componentDidMount() {
    this.visibleTracker = Tracker.autorun(() => {
      this.setState({ showVisible: Session.get('showVisible') });
    });
  }

  componentWillUnmount() {
    this.visibleTracker.stop();
  }

  render() {
    return (
      <div>
        <label>
          <input
            type="checkbox"
            checked={!this.state.showVisible}
            onChange={(e) => {
              Session.set('showVisible', !e.target.checked);
            }}
          />
          Show Hidden Links
        </label>
      </div>
    );
  }
}

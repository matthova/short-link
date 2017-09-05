/* global document */
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import React from 'react';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'react-komposer';

import Login from '../ui/Login';
import Links from '../ui/Links';
import Signup from '../ui/Signup';
import NotFound from '../ui/NotFound';

class AuthenticatedRoute extends React.Component {
  render() {
    const isAuthenticated = !!Meteor.userId();
    const { component: Component, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
      />
    );
  }
}

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <AuthenticatedRoute path="/links" component={Links} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

Routes.propTypes = {
  loggingIn: PropTypes.bool,
  authenticated: PropTypes.bool,
};

const composer = (props, onData) => {
  const loggingIn = Meteor.loggingIn();
  onData(null, {
    loggingIn,
    authenticated: !loggingIn && !!Meteor.userId(),
  });
};

const getTrackerLoader = reactiveMapper => (props, onData, env) => {
  let trackerCleanup = null;
  const handler = Tracker.nonreactive(() =>
    Tracker.autorun(() => {
      // assign the custom clean-up function.
      trackerCleanup = reactiveMapper(props, onData, env);
    }),
  );

  return () => {
    if (typeof trackerCleanup === 'function') trackerCleanup();
    return handler.stop();
  };
};

const composeWithTracker = data => compose(getTrackerLoader(data));

export default composeWithTracker(composer)(Routes);

import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { compose } from 'react-komposer';
import PropTypes from 'prop-types';

import Login from '../ui/Login';
import Links from '../ui/Links';
import Signup from '../ui/Signup';
import NotFound from '../ui/NotFound';
import AuthenticatedRoute from './AuthenticatedRoute';
import NewUserOnlyRoute from './NewUserOnlyRoute';

const Routes = (props) => {
  const Router = BrowserRouter;
  const routes = (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <NewUserOnlyRoute exact path="/signup" {...props} foo={'bar'} component={Signup} />
        <AuthenticatedRoute exact path="/links" {...props} foo={'bar'} component={Links} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );

  routes.propTypes = {
    loggingIn: PropTypes.bool.isRequired,
    authenticated: PropTypes.bool.isRequired,
  };

  return routes;
};

const composer = (props, onData) => {
  const loggingIn = Meteor.loggingIn();
  const authenticated = !loggingIn && !!Meteor.userId();
  onData(null, { loggingIn, authenticated });
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

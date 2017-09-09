import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import PropTypes from 'prop-types';

const Authenticated = ({ location, component, loggingIn, authenticated, ...rest }) => {
  const Component = component;
  if (loggingIn) return <div />;
  if (!authenticated) return <Redirect to={{ pathname: '/', state: { from: location } }} />;
  const route = <Route {...rest} location={location} render={() => <Component {...rest} />} />;

  return route;
};

Authenticated.propTypes = {
  loggingIn: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  location: ReactRouterPropTypes.location,
};

export default Authenticated;

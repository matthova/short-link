import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import PropTypes from 'prop-types';

const Authenticated = ({ loggingIn, authenticated, component, ...rest }) => {
  console.log(rest);
  const route = (
    <Route
      {...rest}
      render={({ history, location, match, staticContext, ...restRoute }) => {
        console.log('route props', restRoute);
        if (loggingIn) return <div />;
        return authenticated ? (
          <component {...restRoute} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: location } }} />
        );
      }}
    />
  );

  route.propTypes = {
    location: ReactRouterPropTypes.location.isRequired,
  };
  return route;
};

Authenticated.propTypes = {
  loggingIn: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};

export default Authenticated;

import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import PropTypes from 'prop-types';

const NewUserOnlyRoute = ({ location, loggingIn, authenticated, component, ...rest }) => {
  console.log('rest', rest);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (loggingIn) return <div />;
        return authenticated ? (
          <Redirect to={{ pathname: '/links', state: { from: location } }} />
        ) : (
          React.createElement(component, { ...props, loggingIn, authenticated })
        );
      }}
    />
  );
};

// NewUserOnlyRoute.propTypes = {
//   loggingIn: PropTypes.bool.isRequired,
//   authenticated: PropTypes.bool.isRequired,
//   component: PropTypes.func.isRequired,
//   location: ReactRouterPropTypes.location.isRequired,
// };

export default NewUserOnlyRoute;

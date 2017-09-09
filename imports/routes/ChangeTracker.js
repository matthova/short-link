import { Meteor } from 'meteor/meteor';
import ReactRouterPropTypes from 'react-router-prop-types';
import React from 'react';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];

const ChangeTracker = (props) => {
  const isAuthenticated = !!Meteor.userId();
  const isUnauthenticatedPage = unauthenticatedPages.includes(props.location.pathname);
  const isAuthenticatedPage = authenticatedPages.includes(props.location.pathname);

  if (!isAuthenticated && isAuthenticatedPage) {
    return <Redirect to={{ pathname: '/' }} />;
  } else if (isAuthenticated && isUnauthenticatedPage) {
    // Routing users to the fun pages with the content.
    // don't need to sign up or log in, if they're already logged in
    return <Redirect to={{ pathname: '/links' }} />;
  }
  return null;
};

ChangeTracker.propTypes = {
  location: ReactRouterPropTypes.location.isRequired,
};

export default withRouter(ChangeTracker);

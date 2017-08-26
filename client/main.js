/* global document */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Tracker } from 'meteor/tracker';

import Login from '../imports/ui/Login';
import Links from '../imports/ui/Links';
import Signup from '../imports/ui/Signup';
import NotFound from '../imports/ui/NotFound';

const browserHistory = createHistory();
const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];

const ChangeTracker = withRouter(({ match, location, history }) => {
  const isAuthenticated = !!Meteor.userId();
  const isUnauthenticatedPage = unauthenticatedPages.includes(location.pathname);
  const isAuthenticatedPage = authenticatedPages.includes(location.pathname);

  if (isAuthenticated && isUnauthenticatedPage) {
    // Note, pushing history while rendering a component will force
    // an error, since you are updating the state mid-render
    return <Redirect to={{ pathname: '/links' }} />;
  } else if (!isAuthenticated && isAuthenticatedPage) {
    return <Redirect to={{ pathname: '/' }} />;
  }
  return null;
});

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

const routes = (
  <Router history={browserHistory}>
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <AuthenticatedRoute path="/links" component={Links} />
        <Route component={NotFound} />
      </Switch>
      <ChangeTracker />
    </div>
  </Router>
);

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});

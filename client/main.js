/* global document */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from '../imports/ui/Login';
import Links from '../imports/ui/Links';
import Signup from '../imports/ui/Signup';
import NotFound from '../imports/ui/NotFound';

// How do I show one component if at / or /foo or /bar and nothing if anywhere else

const routes = (
  <Router>
    <Switch>
      <Login exact path="/" />
      <Links path="/links" />
      <Signup path="/signup" />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});

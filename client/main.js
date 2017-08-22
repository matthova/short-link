import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from '../imports/ui/Login';
import Link from '../imports/ui/Link';
import Signup from '../imports/ui/Signup';
import NotFound from '../imports/ui/NotFound';

const routes = (
  <Router>
    <Switch>
      <Login exact path="/" />
      <Link path="/link" />
      <Signup path="/signup" />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});

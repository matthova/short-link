/* global document */
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

import Routes from '../imports/routes/routes';
import Login from '../imports/ui/Login';
import Signup from '../imports/ui/Signup';
import NotFound from '../imports/ui/NotFound';
import Links from '../imports/ui/Links';

const authenticate = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

Meteor.startup(() => {
  // render(
  //   <BrowserRouter>
  //     <Switch>
  //       <Route name="login" exact path="/" component={Login} />
  //       <Route name="signup" path="/signup" component={Signup} />
  //       <Authenticated exact path="/links" component={Links} {...appProps} />
  //       {/* <Route name="links" path="/links" component={Links} /> */}
  //       <Route path="*" component={NotFound} />
  //     </Switch>
  //   </BrowserRouter>,
  //   document.getElementById('app'),
  // );

  render(<Routes />, document.getElementById('app'));
});

/* global document */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import { Session } from 'meteor/session';

import Routes from '../imports/routes/routes';
import '../imports/startup/simple-schema-configuration';

Meteor.startup(() => {
  Session.set('showVisible', true);
  render(<Routes />, document.getElementById('app'));
});

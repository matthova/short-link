/* global document */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';

import Routes from '../imports/routes/routes';

Meteor.startup(() => {
  render(<Routes />, document.getElementById('app'));
});

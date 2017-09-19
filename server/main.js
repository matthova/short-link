import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import { ServiceConfiguration } from 'meteor/service-configuration';

import '../imports/api/users';
import { Links } from '../imports/api/links';
import '../imports/startup/simple-schema-configuration';

ServiceConfiguration.configurations.remove({
  service: 'facebook',
});

ServiceConfiguration.configurations.insert({
  service: 'facebook',
  secret: process.env.FB_SECRET,
  appId: process.env.FB_APP_ID,
});

ServiceConfiguration.configurations.remove({
  service: 'google',
});

ServiceConfiguration.configurations.insert({
  service: 'google',
  clientId: process.env.GOOGLE_APP_ID,
  secret: process.env.GOOGLE_SECRET,
});

Meteor.startup(() => {
  WebApp.connectHandlers.use((req, res, next) => {
    const _id = req.url.slice(1);
    const link = Links.findOne({ _id });

    if (link) {
      res.statusCode = 302;
      res.setHeader('Location', link.url);
      res.end();
      Meteor.call('links.trackVisit', _id);
    } else {
      next();
    }
  });
});

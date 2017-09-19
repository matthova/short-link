import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';
import _ from 'lodash';

Accounts.validateNewUser((user) => {
  const email = user.emails[0].address;

  try {
    new SimpleSchema({
      email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
      },
    }).validate({ email });
  } catch (ex) {
    throw new Meteor.Error(400, ex.message);
  }

  return true;
});

Accounts.onCreateUser((options, user) => {
  if (!user.services.facebook && !user.services.google) {
    return user;
  }

  user.username = _.get(user, 'services.facebook.name') || _.get(user, 'services.google.name');
  user.emails = [];
  if (_.get(user, 'services.facebook.email')) {
    user.emails.push({ address: user.services.facebook.email });
  }
  if (_.get(user, 'services.google.email')) {
    user.emails.push({ address: user.services.google.email });
  }

  return user;
});

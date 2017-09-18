import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';

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
  if (!user.services.facebook) {
    return user;
  }
  user.username = user.services.facebook.name;
  user.emails = [{ address: user.services.facebook.email }];

  return user;
});

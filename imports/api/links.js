import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
  Meteor.publish('links', function () {
    return Links.find({ userId: this.userId });
  });
}

Meteor.methods({
  'links.insert': function (url) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    try {
      new SimpleSchema({
        url: {
          type: String,
          regEx: SimpleSchema.RegEx.Url,
        },
      }).validate({ url });
    } catch (ex) {
      throw new Meteor.Error(400, ex.message);
    }

    Links.insert(
      {
        url,
        userId: this.userId,
      },
      (error, response) => {
        if (error) {
          // We can toss an error to the user if something fudges up.
          return error.reason;
        }
      },
    );
  },
  'links.remove': function (linkId) {
    Links.remove(linkId, (error) => {
      if (error) {
        // We can toss an error to the user if something fudges up.
        return error.reason;
      }
    });
  },
});

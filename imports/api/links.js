import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

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

    new SimpleSchema({
      url: {
        type: String,
        regEx: SimpleSchema.RegEx.Url,
        label: 'Your link',
      },
    }).validate({ url });

    Links.insert(
      {
        _id: shortid.generate(),
        url,
        userId: this.userId,
        visible: true,
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
  'links.toggleVisiblity': function (linkId, visibleGoal) {
    if (!this.userId) {
      throw new Meteor.error('Cannot toggle "visible" for someone elses id');
    }

    new SimpleSchema({
      linkId: {
        type: String,
        min: 1,
      },
      visibleGoal: {
        type: Boolean,
      },
    }).validate({ linkId, visibleGoal });

    Links.update({ _id: linkId }, { $set: { visible: visibleGoal } }, (error, result) => {});
  },
});

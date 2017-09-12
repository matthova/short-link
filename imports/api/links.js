import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
  Meteor.publish('links', function () {
    return Links.find({ userId: this.userId });
  });

  Meteor.methods({
    // Define our method. Note, we're passing an argument for the tacoToInsert value we passed to our Meteor.call() method.
    addLink(link) {
      Links.insert(
        {
          url: link.url,
          userId: this.userId,
        },
        (error) => {
          if (error) {
            // We can toss an error to the user if something fudges up.
            return error.reason;
          }
        },
      );
    },
    removeLink(link) {
      Links.remove(link._id, (error) => {
        if (error) {
          // We can toss an error to the user if something fudges up.
          return error.reason;
        }
      });
    },
  });
}

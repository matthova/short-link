import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

Meteor.startup(() => {
  // code to run on server at startup
  const employeeSchema = new SimpleSchema({
    name: {
      type: String,
      min: 1,
      max: 200,
    },
    hourlyWage: {
      type: Number,
      min: 0,
    },
    email: {
      type: String,
      regEx: SimpleSchema.RegEx.Email,
    },
  });

  employeeSchema.validate({
    name: 'JimBob',
    hourlyWage: 1,
    email: 'me@me.com',
  });

  // const petSchema = new SimpleSchema({
  //   name: {
  //     type: String,
  //     min: 1,
  //     max: 200,
  //     optional: true,
  //   },
  //   age: {
  //     type: Number,
  //     min: 0,
  //   },
  //   contactNumber: {
  //     type: String,
  //     optional: true,
  //     regEx: SimpleSchema.RegEx.Phone,
  //   },
  // });

  // petSchema.validate({
  //   name: 'foofy',
  //   age: 0,
  //   contactNumber: '402-867-5309',
  // });
});

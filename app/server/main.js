import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';

Meteor.startup(() => {
//Meteor.call('sendEmail', 'fwr5057@psu.edu', 'psusmartwallet@gmail.com', 'Hello from Meteor!', 'This is a test of Email.send.');
  
  // code to run on server at startup
});

Meteor.methods({
  sendEmail: function (to, from, subject, text) {
    check([to, from, subject, text], [String]);

    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    Email.send({
      to: to,
      from: from,
      subject: subject,
      text: text
    });
  }
});

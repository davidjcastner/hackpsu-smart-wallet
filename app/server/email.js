import { Meteor } from 'meteor/meteor';

Meteor.startup(function () {
    //  the MAIL_URL environment variable should be in the form of:
    //  smtp://USERNAME:PASSWORD@HOST:PORT/
    var smtpSettings = {
        USERNAME: "postmaster@mg.capitalzero.io", // SMTP Hostname
        PASSWORD: "a1c0d23f1add6306a4a2fe72a35137e3", // Default Password
        HOST: "smtp.mailgun.org",
        PORT: "587"
    }
    //  mailgun offers other ports but 587 is the one that we should use
    //  check mailgun doc here: http://blog.mailgun.com/25-465-587-what-port-should-i-use/
    var smtpString = "smtp://";
    smtpString += smtpSettings.USERNAME + ":" + smtpSettings.PASSWORD;
    smtpString += "@" + smtpSettings.HOST + ":" + smtpSettings.PORT + "/";
    //console.log(smtpString);
    process.env.MAIL_URL = smtpString;
});


// In your server code: define a method that the client can call
Meteor.methods({
  sendEmail: function (to, from, subject, text) {
//    check([to, from, subject, text], [String]);

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

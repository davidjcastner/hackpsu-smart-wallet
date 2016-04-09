Meteor.startup(function () {
    //  the MAIL_URL environment variable should be in the form of:
    //  smtp://USERNAME:PASSWORD@HOST:PORT/
    var smtpSettings = {
        USERNAME: "", // SMTP Hostname
        PASSWORD: "", // Default Password
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
    if (RUN_TESTS) { runTests(); };

});

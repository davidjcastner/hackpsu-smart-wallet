Meteor.startup(function () {
    try {
        Accounts.createUser({email:"davidjcastner@gmail.com", password:"a"});
    } catch (error) {};
});

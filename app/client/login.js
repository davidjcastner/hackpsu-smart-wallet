Template.login.events({
    "submit #login-form": function (event, template) {
        event.preventDefault();
        var userEmail = template.find("#email").value;
        var userPassword = template.find("#password").value;
        console.log(userEmail, userPassword);
        Meteor.loginWithPassword(userEmail, userPassword);
    }
});

Template.login.onRendered(function() {
    componentHandler.upgradeAllRegistered();
});

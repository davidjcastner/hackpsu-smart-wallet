Template.signup.onRendered(function() {
    componentHandler.upgradeAllRegistered();
});

Template.signup.events({
    "submit #signup-form": function (event, template) {
        event.preventDefault();
        var confirm_password = template.find("#confirm_password").value;
        var options = {
            email: template.find("#email").value,
            password: template.find("#password").value,
            profile: {
                first_name: template.find("#first_name").value,
                last_name: template.find("#last_name").value,
                street_number: template.find("#street_number").value,
                street_name: template.find("#street_name").value,
                city: template.find("#city").value,
                state: template.find("#state").value,
                zip: template.find("#zip").value
            }
        };
        //console.log(options);
        if (options.password && options.password === confirm_password) {
            Accounts.createUser(options, function (error) {
                if (error) {
                    console.log(error);
                } else {
                    Router.go("dashboard");
                };
            });
        }
    }
});

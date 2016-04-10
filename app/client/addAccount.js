var STARTING_BALANCE = 1000;

var getAccountType = function (template) {
    if (template.find("#option-credit_card").checked) {
        return "Credit Card";
    } else if (template.find("#option-savings").checked) {
        return "Savings";
    } else if (template.find("#option-checking").checked) {
        return "Checking";
    } else {
        throw new Meteor.Error("nothing selected");
    };
};

Template.addAccount.onRendered(function() {
    componentHandler.upgradeAllRegistered();
});

Template.addAccount.events({
    "submit #add-account-form": function (event, template) {
        event.preventDefault();
        var options = {
            type: getAccountType(template),
            nickname: template.find("#nickname").value,
            rewards: parseInt(template.find("#rewards").value),
            balance: STARTING_BALANCE,
            account_number: template.find("#account_number").value
        };
        //console.log(options);
        Meteor.call("add_nessie_account", options, function (error, result) {
            if (error) {
                console.log(error);
            } else {
                Router.go("dashboard");
            };
        });
    },
});

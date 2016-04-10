Template.header.helpers({
    getName: function () {
        console.log(Meteor.user());
        return Meteor.user().profile.first_name + " " + Meteor.user().profile.last_name;
    }
});

Template.header.events({
    "click #logo": function (event, template) {
        Router.go("homePage");
    },
    "click #dashboardLink": function (event, template) {
        Router.go("dashboard");
    },
    "click #login": function (event, template) {
        Router.go("login");
    },
    "click #signup": function (event, template) {
        Router.go("signup");
    },
    "click #logout": function (event, template) {
        Meteor.logout();
        Router.go("homePage");
    }
});

Template.header.events({
    "click #logo": function (event, template) {
        Router.go("homePage")
    },
    "click #dashboardLink": function (event, template) {
        Router.go("dashboard")
    }
});

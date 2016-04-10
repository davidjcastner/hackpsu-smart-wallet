import { Session } from 'meteor/session';

Template.dashboard.onCreated(function () {
    Session.set("isTabAlarms", true);
});

Template.dashboard.helpers({
    isCurrentTabAlarms: function () {
        return Session.get("isTabAlarms");
    },
    isNoNotifications: function () {
        //console.log(GeoLocations.find().count());
        return GeoLocations.find().count() == 0;
    },
    getNotifications: function () {
        return GeoLocations.find({});
    },
    isNoCards: function () {
        return false;
    },
    getCards: function () {
        return [{}];
    }
});

Template.dashboard.events({
    "click #alarms": function (event, template) {
        Session.set("isTabAlarms", true);
    },
    "click #manage": function (event, template) {
        Session.set("isTabAlarms", false);
    },
    "click #addAccount": function (event, template) {
        Router.go("addAccount");
    }
});

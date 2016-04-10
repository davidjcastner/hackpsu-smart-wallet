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
        return NessieAccounts.find().count() == 0;
    },
    getCards: function () {
        return NessieAccounts.find({});
    }
});

Template.dashboard.events({
    "click #alarms": function (event, template) {
        Session.set("isTabAlarms", true);
    },
    "click #manage": function (event, template) {
        Session.set("isTabAlarms", false);
    },
    "click #addAlarm": function (event, template) {
        Router.go("addAlarm");
    },
    "click #addAccount": function (event, template) {
        Router.go("addAccount");
    },
    "click #remove-geo-location": function (event, template) {
        Meteor.call("remove_geo_location", this._id);
    },
    "click #remove-account": function (event, template) {
        Meteor.call("remove_account", this._id);
    },
    "click #start-simulation": function (event, template) {
        Meteor.call("start_simulation");
    }
});

import { Mongo } from 'meteor/mongo';

GeoLocations =  new Mongo.Collection('geoLocations');
NessieAccounts =  new Mongo.Collection('nessieAccounts');

Meteor.publish('geo_locations', function() {
    return GeoLocations.find({ userId: this.userId }, { fields: {
        userId: false
    }});
});

Meteor.publish('nessie_accounts', function() {
    return NessieAccounts.find({ userId: this.userId }, { fields: {
        userId: false
    }});
});

Meteor.methods({
    add_geo_location: function (options) {
        // run checks here, don't need to write them for the hackathon
        options.userId = Meteor.userId();
        GeoLocations.insert(options);
    },
    remove_geo_location: function (geoLocationId) {
        GeoLocations.remove({_id:geoLocationId});
    },
    remove_account: function (nessieAccountId) {
        NessieAccounts.remove({_id:nessieAccountId});
    }
});

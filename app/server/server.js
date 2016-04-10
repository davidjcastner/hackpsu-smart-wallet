import { Mongo } from 'meteor/mongo';

GeoLocations =  new Mongo.Collection('geoLocations');

Meteor.publish('geo_locations', function() {
    return GeoLocations.find({ /*userId: this.userId */}, { fields: {
        userId: false
    }});
});

Meteor.methods({
    insertGeoLocation: function (options) {
        // run checks here, don't need to write them for the hackathon
        GeoLocations.insert({
            userId: this.userId,
            name: options.name,
            type: options.type,
            lat: options.lat,
            long: options.long,
            //time block
        });
    }
});

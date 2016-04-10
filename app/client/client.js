// this file is for general client code

import { Mongo } from 'meteor/mongo';

GeoLocations =  new Mongo.Collection('geoLocations');

Meteor.subscribe('geo_locations');

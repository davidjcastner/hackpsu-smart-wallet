// this file is for general client code

import { Mongo } from 'meteor/mongo';

GeoLocations =  new Mongo.Collection('geoLocations');
NessieAccounts =  new Mongo.Collection('nessieAccounts');

Meteor.subscribe('geo_locations');
Meteor.subscribe('nessie_accounts');

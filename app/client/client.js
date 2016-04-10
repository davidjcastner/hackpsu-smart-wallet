// this file is for general client code

import { Mongo } from 'meteor/mongo';

GeoLocations =  new Mongo.Collection('geoLocations');
NessieAccounts =  new Mongo.Collection('nessieAccounts');

Meteor.subscribe('geo_locations');
Meteor.subscribe('nessie_accounts');


/*
var emailFrom = "psusmartwallet@gmail.com";
var emailTo = "fwr5057@gmail.com";
var subject = "Smart Wallet Alert";
var messagePart1 = "Hi, \n	You account have a suspicious activity of $"
var transactionAmount = "0";
var messagePart2 = " at "
var transactionPlace = "Penn State";
var completeMessage = messagePart1.concat(transactionAmount, messagePart2, transactionPlace);
*/
//Meteor.call('sendEmail',emailTo , emailFrom, subject, completeMessage);
// this file is for general client code

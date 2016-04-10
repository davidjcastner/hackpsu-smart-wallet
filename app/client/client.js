var emailFrom = "fwr5057@psu.edu";
var emailTo = "psusmartwallet@gmail.com";
var subject = "Smart Wallet Alert";
var messagePart1 = "Hi, \n	You account have a suspicious activity of $"
var transactionAmount = "0";
var messagePart2 = " at "
var transactionPlace = "Penn State";
var completeMessage = messagePart1.concat(transactionAmount, messagePart2, transactionPlace);

Meteor.call('sendEmail', emailFrom, emailTo, subject, completeMessage);

// this file is for general client code

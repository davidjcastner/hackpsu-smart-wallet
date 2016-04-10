var URL_START_STRING = "http://api.reimaginebanking.com/";
var KEY = "&key=a333eed3b211511bc796f0798ede5288";

Meteor.startup(function () {
    testURL = URL_START_STRING + "accounts?type=Checking" + KEY;
    HTTP.call("GET", testURL, function(error, result) {
        console.log(error);
        console.log(result);
    });
});

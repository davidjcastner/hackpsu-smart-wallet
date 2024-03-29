var URL_START_STRING = "http://api.reimaginebanking.com/";
var KEY = "key=a333eed3b211511bc796f0798ede5288";
var CHECK_TRANSACTION_INTERVAL = 1000 * 30; // 30 seconds
var EMAIL_SENDER_ADDRESS = "psusmartwallet@gmail.com";
var SIMULATION_COUNT = 4; // will send 5 of each type for each account
var SIMULATION_DATE = "2016-04-10";

Create_Nessie_Customer = function (userProfile, userEmail) {
    /* input options: userProfile = options.profile
    below is what is sent to onCreateUser
    var options = {
        email: email,
        password: password,
        profile: {
            first_name: first_name,
            last_name: last_name,
            street_number: street_number,
            street_name: street_name,
            city: city,
            state: state,
            zip: zip
        }
    }; */
    var postBody = {
        "first_name": userProfile.first_name,
        "last_name": userProfile.last_name,
        "address": {
            "street_number": userProfile.street_name,
            "street_name": userProfile.street_number,
            "city": userProfile.city,
            "state": userProfile.state,
            "zip": userProfile.zip
        }
    };
    var createCustomerURL = URL_START_STRING + "customers?" + KEY;
    HTTP.call("POST", createCustomerURL, { data: postBody }, function (error, result) {
        // we need to find the id for capital one
        //console.log(error, result);
        //console.log('############################################');
        console.log(result.data.objectCreated._id);
        if (error) {
            //console.log(error);
        } else {
            var user = Accounts.findUserByEmail(userEmail);
            //console.log(user);
            Meteor.users.update({ _id:user._id }, { $set: {
                    "profile.nessieId": result.data.objectCreated._id
                    }
                }
            );
            //startCheckProcess(user._id);
        };
    });
};

Create_Nessie_Account = function (nessieId, options) {
    /*	{
      "type": "Credit Card",
      "nickname": "string",
      "rewards": 0,
      "balance": 0,
      "account_number": "string"
    }
    */
    var accountPostBody = {
      "type": options.type,
      "nickname": options.nickname,
      "rewards": options.rewards,
      "balance": options.balance,
      "account_number": options.account_number
    };
    var createAccountURL = URL_START_STRING + "customers/" + nessieId + "/accounts?" + KEY;
    //console.log(createAccountURL, accountPostBody);
    HTTP.call("POST", createAccountURL, { data: accountPostBody }, function (error, result) {
        var user = Meteor.users.findOne({"profile.nessieId":nessieId});
        //console.log(result);
        Meteor.users.update({ _id:user._id }, { $push: {
                "profile.nessieAccountIds": result.data.objectCreated._id
                }
            }
        );
    });
};

var startCheckProcess = function (userId) {
    //setInterval(Test_All_New_Transactions, CHECK_TRANSACTION_INTERVAL, userId);
};

/*var test = function (userId) {
    console.log(userId);
};*/

Test_All_New_Transactions = function (userId) {
    /* Steps to take:
    1. get all nessieAccounts for the user
    2. perform a get request for each account on the following types:
        deposits
        withdraws
        transfers
        purchases
    3. determine if the transaction was already taken care of
    */
    if (GeoLocations.find({userId:userId}).count() > 0) {
        var user = Meteor.users.findOne({_id:userId});
        var nessieId = user.profile.nessieId;
        var nessieAccountIds = user.profile.nessieAccountIds;
        for (var i = 0; i < nessieAccountIds.length; i++) {
            var accountId = nessieAccountIds[i];
            var depositURL = URL_START_STRING + "accounts/" + accountId + "/deposits?" + KEY;
            HTTP.call("GET", depositURL, function (error, result) {
                console.log(error, result);
            });
            /*var purchasesURL = URL_START_STRING + "accounts/" + accountId + "/purchases?" + KEY;
            HTTP.call("GET", purchasesURL, function (error, result) {
                console.log(error, result);
            });
            var payerURL = URL_START_STRING + "accounts/" + accountId + "/transfers?type=payer&" + KEY;
            HTTP.call("GET", payerURL, function (error, result) {
                console.log(error, result);
            });
            var payeeURL = URL_START_STRING + "accounts/" + accountId + "/transfers?type=payee&" + KEY;
            HTTP.call("GET", payeeURL, function (error, result) {
                console.log(error, result);
            });*/
            var withdrawalsURL = URL_START_STRING + "accounts/" + accountId + "/withdrawals?" + KEY;
            HTTP.call("GET", withdrawalsURL, function (error, result) {
                console.log(error, result);
            });
        };
    };
};

var Send_Notification = function (userId, options) {
    var userEmail = Meteor.users.findOne({_id:userId}).emails[0].address;
    var message = "WARNING: A transaction has been made outside of your allowed zones. Location: { Latitude: ";
    message += options.lat + ", Longitude: " + options.long + "}";
    message += ", Date: " + options.date;
    Email.send({
        to: userEmail,
        from: EMAIL_SENDER_ADDRESS,
        subject: "Capital Zero Warning",
        text: message
    });
    console.log("Email Sent");
};

var gps_position_generator = function () {
    var newLat = Math.random() * (90 - (-90)) + (-90);
    var newLng = Math.random() * (180 - (-180)) + (-180);
    //console.log(newLat);
    //console.log(newLng);
    return {lat: newLat, long: newLng};
};

var notInsideAllowedZones = function (userId, options) {
    if (GeoLocations.find({userId:userId}).count() <= 0) {
        return false;
    };
    var isTrue = true
    var geos = GeoLocations.find({userId:userId});
    geos.forEach(function (locationData) {
        try {
            var delta = getDistanceFromLatLonInKm(options.lat, options.long, locationData.lat, locationData.long);
            if (delta <= options.distance) {
                isTrue = false;
            };
        } catch (error) {};
    });
    return isTrue;
};

var Start_Simulation = function (userId) {
    var user = Meteor.users.findOne({_id:userId});
    var nessieId = user.profile.nessieId;
    var nessieAccountIds = user.profile.nessieAccountIds;
    //console.log(nessieAccountIds);
    var postBody = {
        medium: "balance",
        transaction_date: SIMULATION_DATE,
        amount: 1,
        description: undefined
    };
    for (var i = 0; i < nessieAccountIds.length; i++) {
        var accountId = nessieAccountIds[i];
        for (var j = 0; j < SIMULATION_COUNT; j++) {
            var urls = [
                URL_START_STRING + "accounts/" + accountId + "/deposits?" + KEY,
                /*URL_START_STRING + "accounts/" + accountId + "/transfers?type=payer&" + KEY,
                URL_START_STRING + "accounts/" + accountId + "/transfers?type=payee&" + KEY,
                URL_START_STRING + "accounts/" + accountId + "/withdrawals?" + KEY*/
            ];
            for (var k = 0; k < urls.length; k++) {
                var url = urls[k];
                var location = gps_position_generator();
                var description = {
                    date: new Date(),
                    lat: location.lat,
                    long: location.long
                };
                if (notInsideAllowedZones(userId, description)) {
                    Send_Notification(userId, description);
                };
                postBody.description = JSON.stringify(description);
                HTTP.call("POST", url, { data: postBody });
            };
        };
    };
};

function deg2rad(deg) {
    return deg * (Math.PI/180)
}

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1);
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c * 0.621371; // Distance in mile
    //console.log(d);
    return d;
}



Meteor.startup(function () {
    //getDistanceFromLatLonInKm(45,90,46,91);
});

Meteor.startup(function () {
    testURL = URL_START_STRING + "customers?" + KEY;
    if (false) {
        console.log(testURL);
        HTTP.call("GET", testURL, function(error, result) {
            console.log(error);
            console.log(result);
    }); };
});

Meteor.methods({
    "add_nessie_account": function (options) {
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-logged-in");
        } else {
            var nessieId = Meteor.user().profile.nessieId;
            //console.log(Meteor.user());
            //console.log(nessieId);
            options.userId = Meteor.userId();
            NessieAccounts.insert(options);
            Create_Nessie_Account(nessieId, options);
        };
    },
    "start_simulation": function () {
        console.log("Starting Simulation");
        Start_Simulation(Meteor.userId());
    }
});

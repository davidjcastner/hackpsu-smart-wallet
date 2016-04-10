var URL_START_STRING = "http://api.reimaginebanking.com/";
var KEY = "key=a333eed3b211511bc796f0798ede5288";
var CHECK_TRANSACTION_INTERVAL = 1000 * 30; // one minute

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
        //console.log(result.data.objectCreated._id);
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
            startCheckProcess(user._id);
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
    setInterval(Test_All_New_Transactions, CHECK_TRANSACTION_INTERVAL, userId);
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
    var user = Meteor.users.findOne({_id:userId});
    var nessieId = user.profile.nessieId;
    var nessieAccountIds = user.profile.nessieAccountIds;
    for (var i = 0; i < nessieAccountIds.length; i++) {
        var accountId = nessieAccountIds[i];
        var depositURL = URL_START_STRING + "accounts/" + accountId + "/deposits?" + KEY;
        HTTP.call("GET", depositURL, function (error, result) {
            console.log(error, result);
        });
        var purchasesURL = URL_START_STRING + "accounts/" + accountId + "/purchases?" + KEY;
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
        });
        var withdrawalsURL = URL_START_STRING + "accounts/" + accountId + "/withdrawals?" + KEY;
        HTTP.call("GET", withdrawalsURL, function (error, result) {
            console.log(error, result);
        });
    };
};

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
    }
});

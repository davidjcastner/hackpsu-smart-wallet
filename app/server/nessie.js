var URL_START_STRING = "http://api.reimaginebanking.com/";
var KEY = "key=a333eed3b211511bc796f0798ede5288";

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
    createCustomerURL = URL_START_STRING + "customers?" + KEY;
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

var accoutPostBody = {
  "type": option.account_type,
  "nickname": option.nickname,
  "rewards": option.rewards,
  "balance": option.balance,
  "account_number": option.account_number
};

createAccountURL = URL_START_STRING + "customers/ " + nessieId + "/accounts?" + KEY;

HTTP.call("POST", createCustomerURL, { data: accoutPostBody }, function (error, result) {
	console.log(result);	
  });

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
            var nessieId = Meteor.user.nessieId;
            options.userId = Meteor.userId();
            NessieAccounts.insert(options);
            Create_Nessie_Account(nessieId, options);
        };
    }
});

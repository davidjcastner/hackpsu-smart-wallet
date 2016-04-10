Accounts.onCreateUser(function(options, user) {
    // We still want the default hook's 'profile' behavior.
    options.nessieAccountIds = [];
    //console.log(options);
    if (options.profile) { user.profile = options.profile; }
    //console.log(user);
    Create_Nessie_Customer(options.profile, options.email);
    return user;
});

Accounts.onCreateUser(function(options, user) {
    // We still want the default hook's 'profile' behavior.
    //console.log(options);
    if (options.profile) { user.profile = options.profile; }
    //console.log(user);
    return user;
});

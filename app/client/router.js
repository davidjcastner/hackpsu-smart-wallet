Router.configure({
    //loadingTemplate: 'loading',
    //notFoundTemplate: 'notFound',
    layoutTemplate: 'layout',
});
Router.route("/", {
    name: "homePage",
    layoutTemplate: 'layout',
    action: function () {
        this.render("index");
    }
});
Router.route("/dashboard", {
    name: "dashboard",
    layoutTemplate: 'layout',
    action: function () {
        this.render("dashboard");
    }
});
Router.route("/signup", {
    name: "signup",
    layoutTemplate: 'layout',
    action: function () {
        this.render("signup");
    }
});
Router.route("/login", {
    name: "login",
    layoutTemplate: 'layout',
    action: function () {
        this.render("login");
    }
});
Router.route("/add_account", {
    name: "addAccount",
    layoutTemplate: 'layout',
    action: function () {
        this.render("addAccount");
    }
});
Router.route("/add_alarm", {
    name: "addAlarm",
    layoutTemplate: 'layout',
    action: function () {
        this.render("addAlarm");
    }
});

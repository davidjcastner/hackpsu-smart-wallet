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

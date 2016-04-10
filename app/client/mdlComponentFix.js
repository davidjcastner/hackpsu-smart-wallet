_.each(_.keys(Template), function(key) {
     if (Template[key] instanceof Blaze.Template) {
        //console.log(key, "is the name of a template");
        Template[key].onRendered(componentFix);
     }
});

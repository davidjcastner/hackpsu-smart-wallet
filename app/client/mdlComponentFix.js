import { Blaze } from 'meteor/blaze';

_.each(_.keys(Template), function(key) {
     if (Template[key] instanceof Blaze.Template) {
        //console.log(key, "is the name of a template");
        //console.log(key);
        //Template[key].onRendered(componentHandler.upgradeAllRegistered());
     }
});

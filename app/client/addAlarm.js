var initializeMap = function (divId) {
    //Set Google map center to Penn State
    var mapCenter = new google.maps.LatLng(40.7982133,-77.8620971);
    var mapProp = {
        center: mapCenter,
        zoom:8,
        mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    var map=new google.maps.Map(document.getElementById(divId),mapProp);
    //Create a marker that is on myCenter, or Penn State
    var marker=new google.maps.Marker({
        position: mapCenter,
        animation: google.maps.Animation.BOUNCE
    });
    marker.setMap(map);
    map.addListener('click', function(event) {
        var lat = event.latLng.lat();
        var lng = event.latLng.lng();
        //console.log('Lat: ' + lat + " Lng: " + lng);
        Session.set("input-map-lat", lat);
        Session.set("input-map-long", lng);
        marker.setMap(null);
        marker=new google.maps.Marker({
            position: {lat: lat, lng: lng},
            animation: google.maps.Animation.DROP
        });
        marker.setMap(map);
    });
};

Template.addAlarm.onCreated(function () {
    Session.set("input-map-lat", 40.7982133);
    Session.set("input-map-long", -77.8620971);
});

Template.addAlarm.onRendered(function () {
    initializeMap('input-map');
    componentHandler.upgradeAllRegistered();
});

Template.addAlarm.helpers({
    getLat: function () {
        return Session.get("input-map-lat");
    },
    getLong: function () {
        return Session.get("input-map-long");
    }
});

Template.addAlarm.events({
    "submit #add-alarm-form": function (event, template) {
        event.preventDefault();
        var options = {
            name: template.find("#name").value,
            lat: Number(template.find("#lat").value),
            long: Number(template.find("#long").value),
            distance: parseInt(template.find("#distance").value)
        };
        if (options.distance < 0) {
            options.distance = 1;
        };
        //console.log(options);
        Meteor.call("add_geo_location", options, function (error, result) {
            if (error) {
                console.log(error);
            } else {
                Router.go("dashboard");
            };
        });
    }
});

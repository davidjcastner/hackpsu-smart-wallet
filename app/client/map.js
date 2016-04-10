var initializeMap = function (divId) {
    //Set Google map center to Penn State
    var mapCenter = new google.maps.LatLng(40.7982133,-77.8620971);
    var mapProp = {
        center: mapCenter,
        zoom:8,
        mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    var map=new google.maps.Map(document.getElementById(divId),mapProp);
    //adding a marker for each geo location
    var locations = GeoLocations.find();
    locations.forEach(function (location) {
        console.log(location);
        /*var marker=new google.maps.Marker({
            position: {lat:location.lat,lng:location.long},
            animation: google.maps.Animation.DROP
        });*/
        //marker.setMap(map);
        var radiusVar = 1609.34 * location.distance;
        var circle = new google.maps.Circle({
            center: {lat:location.lat, lng:location.long},
            radius:radiusVar,
            strokeColor:"#0000FF",
            strokeOpacity:0.8,
            strokeWeight:2,
            fillColor:"#0000FF",
            fillOpacity:0.4
        });
        circle.setMap(map);
    });
};

Template.map.onRendered(function() {
    initializeMap('display-map');
});

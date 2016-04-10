
function initialize() {

  //Set Google map center to Penn State
  var mapCenter = new google.maps.LatLng(40.7982133,-77.8620971);

  var mapProp = {
    center: mapCenter,
    zoom:5,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);

 //Create a marker that is on myCenter, or Penn State
 var marker=new google.maps.Marker({
   position: mapCenter,
   animation:google.maps.Animation.BOUNCE
   });
 marker.setMap(map);

 map.addListener('click', function(event) {
  var lat = event.latLng.lat();
  var lng = event.latLng.lng();

  console.log('Lat: ' + lat + " Lng: " + lng);
  $('#lat').val(lat);
  $('#long').val(lng);
 });

}
google.maps.event.addDomListener(window, 'load', initialize);

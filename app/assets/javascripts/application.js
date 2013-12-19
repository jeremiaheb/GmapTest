// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require underscore
//= require gmaps/google
//= require_tree 

$(document).ready(function(){

  var primaryLocationData = primaryLocations;
  var alternateLocationData = alternateLocations;
  
  function setInfoWindowContent(site, lat, lon){
    return  "<div id='content'> Site ID: <b>" + site + "</b>"+
            "<p> Latitude: " + lat + "</p>"+
            "<p> Longitude: " + lon + "</p>"+
            "</div>"
  };

  function getMarkerPath(iconCode) {
    switch (iconCode)
    {
      case "2212":
        return "/assets/mm_20_black.png";
        break;
      case "1112":
        return "/assets/mm_20_white.png";
        break;
      case "1122":
        return "/assets/mm_20_green.png";
        break;
      case "1232":
        return "/assets/mm_20_yellow.png";
        break;
      case "1242":
        return "/assets/mm_20_purple.png";
        break;
    }
  };
  


  var map;
  var markers = [];

  function initialize(){
    map = new google.maps.Map(document.getElementById('map_canvas'));
    var bounds = new google.maps.LatLngBounds();
    var infowindow = new google.maps.InfoWindow();

    $.each(primaryLocationData, function(i,obj){
      var latlng = new google.maps.LatLng(obj.latitude, obj.longitude);
      bounds.extend(latlng);
      var marker = new google.maps.Marker({
        position: latlng,
          map: map,
          title: obj.site,
          content: setInfoWindowContent(obj.site, obj.latitude, obj.longitude),
          icon: getMarkerPath(obj.iconCode)
      });
     
      google.maps.event.addListener(marker, 'click', function(){
        infowindow.setContent(this.content);
        infowindow.open(map, this);
      });
    });
    
    $.each(alternateLocationData, function(i,obj){
      var latlng = new google.maps.LatLng(obj.latitude, obj.longitude);
      var marker = new google.maps.Marker({
          position: latlng,
          title: obj.site,
          content: setInfoWindowContent(obj.site, obj.latitude, obj.longitude),
          icon: getMarkerPath(obj.iconCode)
      });
      markers.push(marker);
     
      google.maps.event.addListener(marker, 'click', function(){
        infowindow.setContent(this.content);
        infowindow.open(map, this);
      });
    });

    map.fitBounds(bounds);
  }

google.maps.event.addDomListener(window, 'load', initialize);

// Sets the map on all markers in the array.
function setAllMap(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setAllMap(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setAllMap(map);
}

$("#showMarkers").on('click', function(){
  showMarkers();
});

$('#clearMarkers').on('click', function(){
  clearMarkers();
});

});



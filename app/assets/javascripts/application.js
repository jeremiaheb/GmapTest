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
//= require twitter/bootstrap
//= require underscore
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

  function getMarkerPath(iconLevel, iconCode) {
    if (iconLevel == 2) { 
      return "assets/mm_20_black.png";
     }
    else if ( iconCode >= 30 ) {
      return "assets/mm_20_purple.png";
    }
    else {  
      switch (iconCode)
      {
        case "11":
          return "/assets/mm_20_white.png";
          break;
        case "12":
          return "/assets/mm_20_green.png";
          break;
        case "21":
          return "/assets/WhiteTriangle.png";
          break;
        case "22":
          return "/assets/GreenTriangle.png";
          break;
        case "23":
          return "/assets/YellowTriangle.png";
          break;
        case "24":
          return "/assets/OrangeTriangle.png";
          break;
      }
    }
  };
  


  var map;
  var primaryMarkers = [];
  var alternateMarkers = [];

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
          icon: getMarkerPath(obj.level, obj.iconCode)
      });

      primaryMarkers.push(marker);
     
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
          icon: getMarkerPath(obj.level, obj.iconCode)
      });
      alternateMarkers.push(marker);
     
      google.maps.event.addListener(marker, 'click', function(){
        infowindow.setContent(this.content);
        infowindow.open(map, this);
      });
    });

     google.maps.event.addListener(map, 'click', function(e) { //important listener          
        var theBounds = map.getBounds();
        var allMarkers = primaryMarkers.concat(alternateMarkers);
        var markersInBounds = [];
          for (var i = 0; i < allMarkers.length; i++) {
            if (theBounds.contains(allMarkers[i].position)) {
              markersInBounds.push(allMarkers[i].title);
            }
          };
        alert(markersInBounds);
     });
    map.fitBounds(bounds);
  }

google.maps.event.addDomListener(window, 'load', initialize('map'));

// Sets the map on all markers in the array.
function setAllMap(map) {
  for (var i = 0; i < alternateMarkers.length; i++) {
    alternateMarkers[i].setMap(map);
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



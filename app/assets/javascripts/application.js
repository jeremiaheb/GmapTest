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

  var LocationData = myLocations;
  
  function setInfoWindowContent(site, lat, lon){
    return  "<div id='content'> Site ID: <b>" + site + "</b>"+
            "<p> Latitude: " + lat + "</p>"+
            "<p> Longitude: " + lon + "</p>"+
            "</div>"
  };

  

  function initialize(){
    var map = new google.maps.Map(document.getElementById('map_canvas'));
    var bounds = new google.maps.LatLngBounds();
    var infowindow = new google.maps.InfoWindow();

    $.each(LocationData, function(i,obj){
      var latlng = new google.maps.LatLng(obj.latitude, obj.longitude);
      bounds.extend(latlng);
      var marker = new google.maps.Marker({
        position: latlng,
          map: map,
          title: obj.site,
          content: setInfoWindowContent(obj.site, obj.latitude, obj.longitude),
          icon: "/assets/mm_20_purple.png"
      });

      google.maps.event.addListener(marker, 'click', function(){
        infowindow.setContent(this.content);
        infowindow.open(map, this);
      });
    });

    map.fitBounds(bounds);
  }

google.maps.event.addDomListener(window, 'load', initialize);

});

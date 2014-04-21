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
//= require jquery.ui.all
//= require best_in_place
//= require twitter/bootstrap
//= require underscore
//= require dataTables/jquery.dataTables
//= require dataTables/jquery.dataTables.bootstrap
//= require_tree 

$(document).ready(function(){

  jQuery(".best_in_place").best_in_place();

  $.datepicker.setDefaults({
    dateFormat: "yy-mm-dd"
  });
  
  $('.datepicker').datepicker();

  // For fixed width containers
    $('.dataTable').dataTable( {
        //"sDom": "<'row'<'span7'lf>r>t<'row'<'span7'ip>>",
        "sDom": '<"top"ifp<"clear">>rt<"bottom"<"clear">>',
        //"sPaginationType": "bootstrap",
        "sScrollY": "300px",
        "bPaginate": false,
        "bScrollCollapse": true,
        "aoColumns": [{ "sWidth": "5%" }, { "sWidth": "10%" }, { "sWidth": "10%" }, { "sWidth": "10%" }, { "sWidth": "10%" }, { "sWidth": "10%" }, { "sWidth": "10%" }, { "sWidth": "15%" }, { "sWidth": "5%"}],
        "bInfo": false
    } );

  function setReservedClass() {
    $('.isreserved').each(function(){
      var $reserved = $(this).text();
      if ( $reserved == "Yes" ) { 
        $(this).closest("tr").addClass("true"); 
      } else { $(this).closest("tr").removeClass("true"); }
    });
  };

  setReservedClass();
  
  $(document).ready(function(){
  $('.isreserved').on("click", function() {
    setReservedClass();
  });
  });

  var primaryLocationData = primaryLocations;
  var alternateLocationData = alternateLocations;
  
  function setInfoWindowContent(site, lat, lon){
    return  "<div id='content'> Site ID: <b>" + site + "</b>"+
            "<p> Latitude: " + lat + "</p>"+
            "<p> Longitude: " + lon + "</p>"+
            "</div>"
  };
  
  function setExtentContent(site, lat, lon){
    return  "<p> <b>" + site + ": </b>" + lat + "," + lon + "</p>"
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
          return "/assets/GreenTriangles.png";
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
          extentContent: setExtentContent(obj.site, obj.latitude, obj.longitude),
          icon: getMarkerPath(obj.level, obj.iconCode),
          iconCode: obj.iconCode,
          shadow: "assets/OrangeTriangle.png"
      });

      primaryMarkers.push(marker);
     
      google.maps.event.addListener(marker, 'click', function(){
        infowindow.setContent(this.content);
        infowindow.open(map, this);
      });

    });
    
    $.each(alternateLocationData, function(i,obj){
      var latlng = new google.maps.LatLng(obj.latitude, obj.longitude);
      bounds.extend(latlng);
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

    map.fitBounds(bounds);
  }

google.maps.event.addDomListener(window, 'load', initialize('map'));


function refreshMap() {
  location.reload();
}

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

function showFishSites() {
         var theBounds = map.getBounds();
        //var allMarkers = primaryMarkers.concat(alternateMarkers); //for all
        //primary and alternate
        var allMarkers = primaryMarkers;
        var markersInBounds = [];
          for (var i = 0; i < allMarkers.length; i++) {
            if (theBounds.contains(allMarkers[i].position) && ~$.inArray(allMarkers[i].iconCode,["11","21","24"]) ) {
              $(".extentSites").append(allMarkers[i].extentContent);
            }
          };
}

function showDemoSites() {
         var theBounds = map.getBounds();
        //var allMarkers = primaryMarkers.concat(alternateMarkers); //for all
        //primary and alternate
        var allMarkers = primaryMarkers;
        var markersInBounds = [];
          for (var i = 0; i < allMarkers.length; i++) {
            if (theBounds.contains(allMarkers[i].position) && ~$.inArray(allMarkers[i].iconCode,["21","23"]) ) {
              $(".extentSites").append(allMarkers[i].extentContent);
            }
          };
}

$("#refreshMap").on('click', function(){
  refreshMap();
});

$("#showMarkers").on('click', function(){
  showMarkers();
});

$('#clearMarkers').on('click', function(){
  clearMarkers();
});

$('#showFishSites').on('click', function(){
  $(".extentSites").empty();
  $(".extentSites").append("<h6> Fish Sites Available </h6>")
  showFishSites();
});

$('#showDemoSites').on('click', function(){
  $(".extentSites").empty();
  $(".extentSites").append("<h6> Demo Sites Available </h6>")
  showDemoSites();
});

});



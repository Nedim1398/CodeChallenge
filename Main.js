function openPage(pageName, elmnt) {
											// Hide all elements with class="tabcontent" by default */
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

											// Show the specific tab content
  document.getElementById(pageName).style.display = "block"; 
}



var map = L.map('map').setView([44.534104, 18.692896], 13);
var layerGroup = L.layerGroup().addTo(map);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([44.534104, 18.692896]).addTo(map); // Creates the map centering on my Location and adds a marker
	
var polygon = L.polygon(
[[44.5166572094,18.6670350905],
[44.5166572094,18.7182760115],
[44.5515314994,18.7182760115],
[44.5515314994,18.6670350905],
[44.5166572094,18.6670350905]]
).addTo(map);								// Creates a 5km square

function addr_search() {
  var i = 0;
  layerGroup.clearLayers();					// Clears any previous markers
  var inp = document.getElementById("addr");
  
  $.getJSON('https://nominatim.openstreetmap.org/search?format=json&viewbox=18.667035,44.516657,18.718276,44.551531&limit=50&bounded=1&q=' + inp.value, function(data) {
var items = [];								// Creates a virtual 5km square on the map limiting the results to said square
var name = "";
var address = "";
var lat = "";
var lon = "";
var R = 6371; 								// Radius of the earth in km
var dLat;
var dLon;
var a;
var c;
var d;										// Variables for distance calculation
$.each(data, function(key, val) {
  
  items.push(
    "<li><a href='#' onclick='chooseAddr(" +
    val.lat + ", " + val.lon + ");return false;'>" + val.display_name +
    '</a></li>'
  );										// Creates a list of locations - Probably useful for reading data with server
  
  L.marker([val.lat, val.lon]).addTo(layerGroup);
											// Adds markers to a group so they can be deleted more easily
  
  name=val.display_name.substr(0,5);		// Bingo name - debugging - converting to data usable by database

  address=val.display_name;
  address=address.substr(7,address.length-5);
											// Address name - debugging - converting to data usable by database
  lat = val.lat;
  lon = val.lon;							// Latitude and longitude - debugging - converting to data usable by database
  
  dLat = deg2rad(44.534104-lat);  			// deg2rad below
  dLon = deg2rad(18.692896-lon); 
  a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat)) * Math.cos(deg2rad(44.534104)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  d = R * c; 								// Calculates distance in km
  d = parseFloat(d).toFixed(2);				// Rounds the distance to 2 decimal places

});
  });
}

function save(){
											// Save locations to Database
}

function deg2rad(deg) {
  return deg * (Math.PI/180)				// Convert degrees to radians
}

function loadBingo(){
	console.log("hey");						// Database call to be added
}




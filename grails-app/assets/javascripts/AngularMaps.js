/**
 * Created by saura on 7/24/2017.
 */
var cities = [
    {
        city : 'Kathmandu',
        desc : 'Capital city of Nepal',
        lat : 27.7172,
        long : 85.3240
    }
];
var latLongInitial = {};
var latLongFinal = {};
var sampleApp = angular.module('mapsApp', []);
var clicks = 0;
var directionsService = new google.maps.DirectionsService;
var directionsDisplay = new google.maps.DirectionsRenderer;
sampleApp.controller('MapCtrl', function ($scope) {
    init($scope);
    marker($scope);
    clickListner($scope);
    /* $scope.resetCoordinates = function(){
     latLongInitial={};
     latLongFinal={};
     }*/
});
function clickListner($scope) {
    google.maps.event.addListener($scope.map, 'click', function(event) {
        if (clicks == 0){
            resetCoordinates();
            latLongInitial['lat'] = event.latLng.lat().toFixed(4);
            latLongInitial['long'] = event.latLng.lng().toFixed(4);
            clicks++;
        } else{
            latLongFinal['lat'] = event.latLng.lat().toFixed(4);
            latLongFinal['long'] = event.latLng.lng().toFixed(4);
            clicks=0;
        }
        if(!isEmpty(latLongInitial) && !isEmpty(latLongFinal)){
            calculateAndDisplayRoute($scope);
        }

        // latLong['long']
        // console.log(event.latLng.lat().toFixed(4)+"     "+ event.latLng.lng().toFixed(4));
    });
}
function init($scope){
    var mapOptions = {
        zoom: 15,
        center: new google.maps.LatLng(cities[0].lat,cities[0].long),
        mapTypeId: google.maps.MapTypeId.NORMAL
    }
    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
}
function marker($scope){
    var marker = new google.maps.Marker({
        map: $scope.map,
        position: new google.maps.LatLng(cities[0].lat, cities[0].long),
        title: cities[0].city
    });
    marker.content = '<div class="infoWindowContent">' + cities[0].desc + '</div>';
    var infoWindow = new google.maps.InfoWindow();
    // directionsDisplay.setMap($scope.map);
    google.maps.event.addListener(marker, 'click', function(){
        infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
        infoWindow.open($scope.map, marker);
    });
}
function resetCoordinates(){
    latLongInitial={};
    latLongFinal={};
}

function calculateAndDisplayRoute($scope) {
    directionsDisplay.setMap($scope.map);
    directionsService.route({
        origin: latLongInitial['lat']+','+latLongInitial['long'],
        destination: latLongFinal['lat']+','+latLongFinal['long'],
        travelMode: 'DRIVING'
    }, function(response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

function isEmpty(obj) {
    //check if it's an Obj first
    var isObj = obj !== null
        && typeof obj === 'object'
        && Object.prototype.toString.call(obj) === '[object Object]';

    if (isObj) {
        for (var o in obj) {
            if (obj.hasOwnProperty(o)) {
                return false;
                break;
            }
        }
        return true;
    } else {
        console.error("isEmpty function only accept an Object");
    }
}



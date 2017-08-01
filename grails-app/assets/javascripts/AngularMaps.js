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
    createSearchBox($scope);
    createSearchBoxFinal($scope);
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
        mapTypeId: google.maps.MapTypeId.roadmap
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
    resetCoordinates();
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

function createSearchBox($scope) {
    // Create the search box and link it to the UI element.
    var input = document.getElementById('searchBox');
    $scope.searchBox = new google.maps.places.SearchBox(input);
    $scope.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // Bias the SearchBox results towards current map's viewport.
    $scope.map.addListener('bounds_changed', function () {
        $scope.searchBox.setBounds($scope.map.getBounds());
    });
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    $scope.searchBox.addListener('places_changed', function () {
        var places = $scope.searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function (place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            latLongInitial['lat'] = place.geometry.location.lat().toFixed(4);
            latLongInitial['long'] = place.geometry.location.lng().toFixed(4);
            if (!isEmpty(latLongInitial) && !isEmpty(latLongFinal)) {
                calculateAndDisplayRoute($scope);
            }
        });
        $scope.map.fitBounds(bounds);

    });
}

function createSearchBoxFinal($scope){
    // Create the search box and link it to the UI element.
    var input = document.getElementById('searchBoxFinal');
    $scope.searchBoxFinal = new google.maps.places.SearchBox(input);
    $scope.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(input);
    // Bias the SearchBox results towards current map's viewport.
    $scope.map.addListener('bounds_changed', function () {
        $scope.searchBoxFinal.setBounds($scope.map.getBounds());
    });
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    $scope.searchBoxFinal.addListener('places_changed', function () {
        var places = $scope.searchBoxFinal.getPlaces();

        if (places.length == 0) {
            return;
        }
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function (place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            latLongFinal['lat'] = place.geometry.location.lat().toFixed(4);
            latLongFinal['long'] = place.geometry.location.lng().toFixed(4);
            if (!isEmpty(latLongInitial) && !isEmpty(latLongFinal)) {
                calculateAndDisplayRoute($scope);
            }
        });
        $scope.map.fitBounds(bounds);

    });
}



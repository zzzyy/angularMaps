<%--
  Created by IntelliJ IDEA.
  User: saura
  Date: 7/24/2017
  Time: 9:40 PM
--%>

<!DOCTYPE html>
<html ng-app="mapsApp">
<head>
    <meta charset="ISO-8859-1">
    <title>Angular Maps</title>
    <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.0.3/angular.min.js"></script>
    <script src="http://maps.googleapis.com/maps/api/js?key=AIzaSyCA0CgkLL5G0TjxG7teWgh1F-MNjkOXmVo&sensor=false&language=en"></script>
    <asset:stylesheet src="AngularMaps.css"></asset:stylesheet>
    <asset:javascript src="AngularMaps.js"></asset:javascript>
</head>
<body>
<div ng-controller="MapCtrl">
    %{--<input type="button" value="Refresh Coordinates"  ng-click="resetCoordinates();">--}%
    <div id="map" style="width: 1000px;height: 1000px"></div>
</div>
</body>
</html>
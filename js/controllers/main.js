angular.module('GoTTC')
.controller("MainCtrl", [
    '$scope',
    '$rootScope',
    'ttcStore',
    'favouritesService',
    'locationService',
    function($scope, $rootScope, ttcStore, favouritesService, locationService) {
        $scope.DEBUG = true;

        $scope.name = "GoTTC!";
        $scope.tab = "nearest";
        $scope.subtab = "";

        $rootScope.fullScreenLoading = false;

        $scope.$on('gottc.store.nearby.changed', function(msg, data) {
          //$rootScope.fullScreenLoading = true
          $scope.nearby = data;
          $scope.currentIntersection = ttcStore.getCurrentIntersection(data);
        });

        $scope.$on('gottc.store.intersection-times.changed', function(msg, data) {
            $scope.stopHeadingSouthTime = data.south;
            $scope.stopHeadingWestTime = data.west;
            $scope.stopHeadingEastTime = data.east;
            $scope.stopHeadingNorthTime = data.north;
        });

        $scope.changeCurrentIntersection = function(intersection) {
            $scope.currentIntersection = intersection;
            $scope.longitude = intersection.lng;
            $scope.latitude = intersection.lat;
            $scope.changeIntersectionRequest = false;
        };

        $scope.$watch('currentIntersection', function(value) {
            if (!!value) {
                ttcStore.getIntersectionTimes(value.uri);
            }
        });

        $scope.favourites = favouritesService.get();

        // Update the favourites as soon as a new one is added
        $scope.$on('gottc.favourites.changed', function(msg, data) {
          $scope.favourites = favouritesService.get();
        });

        $scope.$on('gottc.store.station-times.changed', function(msg, data) {
          console.log(data);
        });

        $scope.$on('gottc.position.changed', function(msg, data) {
          $scope.longitude = data.longitude;
          $scope.latitude = data.latitude;
          ttcStore.getNearby($scope.latitude, $scope.longitude);
        });

        $scope.getFavouriteTime = function(station) {
            ttcStore.getStopTime(station);
        };
 
    }
]);

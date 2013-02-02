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
          var nearby_stops = data;
          
          if (_.size(nearby_stops)>6) {
           nearby_stops = nearby_stops.splice(0, 6)// Math.max(nearby_stops.length-6,0));
          }
          $scope.nearby = nearby_stops;
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
            $scope.togglePane('nearby','subtab');
        };

        $scope.togglePane = function(pane, type) {
            
            if (!type) {
                type = 'tab';
            }

            if ($scope[type]===pane) {
                $scope[type] = '';
                return;
            }
            $scope[type] = pane;
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

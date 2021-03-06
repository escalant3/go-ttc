angular.module('GoTTC')
.controller("MainCtrl", [
    '$scope',
    '$rootScope',
    'ttcStore',
    'configurationService',
    'locationService',
    function($scope, $rootScope, ttcStore, configurationService, locationService) {
        $scope.DEBUG = true;

        $scope.name = "GoTTC!";
        $scope.subtab = "";
        $scope.latitude = ""; //"43.649724";
        $scope.longitude = ""; //"-79.397142";

        $rootScope.fullScreenLoading = true;

        $scope.$on('gottc.store.nearby.changed', function(msg, data) {
          var nearby_stops = data;
        
          if (_.size(data)>0) {
            $scope.latitude = data[0].lat;
            $scope.longitude = data[0].lng;
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


        $scope.$on('gottc.intersection.changed', function(msg, intersection) {
            $scope.currentIntersection = intersection;
            $scope.longitude = intersection.lng;
            $scope.latitude = intersection.lat;
            $scope.togglePane('','subtab');
        });

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

        $scope.favourites = configurationService.getFavourites();

        // Update the favourites as soon as a new one is added
        $scope.$on('gottc.favourites.changed', function(msg, data) {
          $scope.favourites = favouritesService.get();
        });

        $scope.$on('gottc.store.station-times.changed', function(msg, data) {
          console.log(data);
        });

        $scope.$on('gottc.position.changed', function(msg, data, gps_location) {
          if (!gps_location) {
            $scope.longitude = data.longitude;
            $scope.latitude = data.latitude;
          }
          ttcStore.getNearby(data.latitude, data.longitude);
        });

        $scope.getFavouriteTime = function(station) {
            ttcStore.getStopTime(station);
        };

        $scope.$watch('landingPage', function(value) {
          if (!!value) {
            configurationService.setLandingPage(value);
          }
        });

        $scope.landingPage = configurationService.getLandingPage();
        $scope.tab = $scope.landingPage;
    }
]);

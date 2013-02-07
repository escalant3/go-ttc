angular.module('GoTTC')
.directive('favouriteStation', [
    '$timeout',
    'ttcStore',
    'configurationService',
    'locationService',
    '$filter',
    function($timeout, ttcStore, configurationService, locationService, $filter) {
      return {
        templateUrl: '/js/templates/favourite-station.html',
        scope: true,
        link: function(scope, elem, attrs) {
          var _station,
              direction;

          var abbreviateTime = function(humanizedTime) {
            var number = 1;

            if (!humanizedTime) return null;

            if (humanizedTime.match(/hour/)) {
              if (humanizedTime.match(/\b\d+\b/g)) number = humanizedTime.match(/\b\d+\b/g)[0];
              return number+"h";
            }
            // The next vehicle is not hours away. Let's try minutes
            number = 1;
            if (humanizedTime.match(/minute/)) {
              if (humanizedTime.match(/\b\d+\b/g)) number = humanizedTime.match(/\b\d+\b/g);
              return number+"m";
            }
            number = 1;
            if (humanizedTime.match(/second/)) {
              if (humanizedTime.match(/\b\d+\b/g)) number = humanizedTime.match(/\b\d+\b/g);
              return number+"s";
            }
          };

          scope.$watch(attrs.station, function(value) {
            if (!!value) {
              _station = value;
              
              scope.name = $filter('getRouteName')(_station.name);
              scope.uri = value.uri;
              
              direction = ttcStore.getDirection(value.uri);
              scope.compassUrl = locationService.getCompassUrl(direction);
              scope.directionAbbr = direction.charAt(0).toUpperCase();
    
              scope.$on('gottc.store.station-times.changed' + scope.uri, function(msg, value) {
                if (!!value) {
                  scope.firstVehicleEta = abbreviateTime(value[0]);
                  if (!!value[1] && abbreviateTime(value[0]) !== abbreviateTime(value[1])) {
                    scope.secondVehicleEta = abbreviateTime(value[1]);
                  }
                }
              });

              ttcStore.getStopTime(_station);
            }
          });

          scope.removeFromFavourites = function() {
            configurationService.removeFavourite(_station);
          };

          $timeout(function() {
            if (!!_station) {
              ttcStore.getStopTime(_station);
            }
          }, 5000);

        }
      };
    }
]);

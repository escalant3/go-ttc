angular.module('GoTTC')
.directive('favouriteStation', [
    '$timeout',
    'ttcStore',
    'configurationService',
    'locationService',
    function($timeout, ttcStore, configurationService, locationService) {
      return {
        templateUrl: '/js/templates/favourite-station.html',
        scope: true,
        link: function(scope, elem, attrs) {
          var _station,
              direction;

          var abbreviateTime = function(humanizedTime) {
            var number = 1;
            debugger;
            if (humanizedTime.match(/minute/)) {
              if (humanizedTime.match(/\b\d\b/g)) number = humanizedTime.match(/\b\d\b/g);
              return number+"m";
            }
          };

          scope.$watch(attrs.station, function(value) {
            if (!!value) {
              _station = value;
              
              scope.name = _station.name;
              scope.uri = value.uri;
              
              direction = ttcStore.getDirection(value.uri);
              scope.compassUrl = locationService.getCompassUrl(direction);
              scope.directionAbbr = direction.charAt(0).toUpperCase();
    
              scope.$on('gottc.store.station-times.changed' + scope.uri, function(msg, value) {
                if (!!value) {
                  abbreviateTime(value[0]);
                  scope.nextOne = value[0];
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

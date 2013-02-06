angular.module('GoTTC')
.directive('favouriteStation', [
    '$timeout',
    'ttcStore',
    'configurationService',
    function($timeout, ttcStore, configurationService) {
      return {
        template: '{{ name }} <strong>{{ nextOne}}</strong><span ng-click="removeFromFavourites()">X</span>',
        scope: true,
        link: function(scope, elem, attrs) {
          var _station;

          scope.$watch(attrs.station, function(value) {
            if (!!value) {
              _station = value;
              
              scope.name = _station.name;
              scope.uri = value.uri;
    
              scope.$on('gottc.store.station-times.changed' + scope.uri, function(msg, value) {
                if (!!value) {
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

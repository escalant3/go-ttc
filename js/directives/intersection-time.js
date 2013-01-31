angular.module('GoTTC')
.directive('intersectionTime', [
    '$filter',
    'favouritesService',
    function($filter, favouritesService) {
      return {
        scope: true,
        template: '<strong class="route" ng-bind="stopName | getRouteName"></strong><br>' +
                  '<strong><img ng-src="{{compassUrl}}" ng-show="compassUrl" height="18"> {{direction}}</strong>'+ 
                  '<br>{{ firstTime }}<br>{{ secondTime }}' +
                  '<div ng-click="addToFavourites()" class="favourite-link"><img src="img/favorite.png" height="12"> Save</div>',

        link: function(scope, element, attrs) {
            var _stopInfo = null;

            scope.direction = $filter('capitalize')(attrs.direction);
            scope.$watch(attrs.stopTime, function(value) {
                if (!!value) {
                  _stopInfo = value;
                  scope.stopName = value.first.shape;
                  scope.firstTime = moment.unix(value.first.departure_timestamp).fromNow();
                  scope.secondTime = moment.unix(value.second.departure_timestamp).fromNow();
                } else {
                  scope.stopName = null;
                  scope.firtTime = null;
                  scope.secondTime = null;
                }
            });

            var getCompassUrl = function (direction) {
                if (!direction) return null;
                return 'img/' + direction.toLowerCase() + '.png';
            };

            scope.compassUrl = getCompassUrl(scope.direction);

            scope.addToFavourites = function() {
              favouritesService.add(_stopInfo);
            };

       }
      };
    }
]);

angular.module('GoTTC')
.directive('intersectionTime', [
    '$filter',
    'configurationService',
    'locationService',
    function($filter, configurationService, locationService) {
      return {
        scope: true,
        template: '<div class="times">' +
                    '<div class="times-overflow">' +
                      '<div class="primary-eta" ng-bind="firstTime | abbreviateTime"  ng-hide="!firstTime"></div>' +
                      '<div class="eta" ng-bind="secondTime | abbreviateTime" ng-hide="!secondTime"></div>' +
                    '</div>' +
                  '</div>' +
                  '<div class="stop">' +
                    '<img ng-src="{{compassUrl}}" ng-hide="!compassUrl || !firstTime" height="32">' +
                    '<div class="route" ng-bind="stopName | getRouteName" ng-show="firstTime"></div>'+
                  '</div>',
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

            scope.compassUrl = locationService.getCompassUrl(scope.direction);

            scope.addToFavourites = function() {
              configurationService.addFavourite(_stopInfo);
            };

            scope.directionClassName = function() {
              return $scope.direction.toLowerCase() + 'bound';
            }

       }
      };
    }
]);

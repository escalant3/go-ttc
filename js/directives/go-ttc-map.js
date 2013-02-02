angular.module('GoTTC')
.directive('goTtcMap', [
    'userService',
    function(userService) {
        return {
            template: '<img ng-src="{{mapSrc}}">',
            link: function(scope, elem, attrs) {
                scope.$watch(attrs.longitude, function(value) {
                    if (!!value) {
                        scope.longitude = value;
                        refreshMap();
                    }
                });

                scope.$watch(attrs.latitude, function(value) {
                    if (!!value) {
                        scope.latitude = value;
                        refreshMap();
                    }
                });

                function refreshMap() {
                    scope.mapSrc = 'http://maps.googleapis.com/maps/api/staticmap?center=' +
                                    scope.latitude + ',' + scope.longitude +
                                    '&zoom=18&size=' + userService.viewportWidth + 'x' + parseInt(userService.viewportHeight - 30, 10) + '&maptype=roadmap&sensor=false';
                }

            }


        };
    }
 ]);

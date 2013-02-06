angular.module('GoTTC')
.directive('intersectionSearch', [
    'stationDirectory',
    function(stationDirectory) {
        return {
            templateUrl: '/js/templates/intersection-search.html',
            scope: true,
            link: function(scope, elem, attrs) {
             
              // Custom stations
              if (attrs.intersections) {
                scope.$watch(attrs.intersections, function(value) {
                  scope.intersections = value;
                }, true);

              // All the stations
              } else if (attrs.all) {
                scope.intersections = stationDirectory;
              }

              scope.intersectionClicked = function(station) {
                scope.$emit('gottc.intersection.changed', station);
              };
            }
        };
    }
 ]);

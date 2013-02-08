angular.module('GoTTC')
.directive('intersectionSearch', [
    'stationDirectory',
    'intersectionDirectory',
    function(stationDirectory, intersectionDirectory) {
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
                // Show just the subways by default
                scope.intersections = stationDirectory;
                // If they start typing show all intersections
                scope.$watch('searchText', function(query) {
                  if (!!query) {
                    scope.intersections = _.filter(stationDirectory.concat(intersectionDirectory), function(intersection){ return intersection.name.indexOf(query)===0; });
                  }
                });
              }

              scope.intersectionClicked = function(station) {
                scope.$emit('gottc.intersection.changed', station);
              };
            }
        };
    }
 ]);

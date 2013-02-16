angular.module('GoTTC')
.directive('intersectionSearch', [
    'stationDirectory',
    'intersectionDirectory',
    function(stationDirectory, intersectionDirectory) {
        return {
            templateUrl: 'js/templates/intersection-search.html',
            scope: true,
            link: function(scope, elem, attrs) {

              var limitIntersections = function(intersections, limit) {
                if (!intersections) return null;

                if (_.size(intersections)>limit) {
                  intersections = intersections.splice(0, limit);
                }
                return intersections;
              };

              // Custom stations
              if (attrs.intersections) {
                scope.$watch(attrs.intersections, function(nearby_stops) {
                  if (!!nearby_stops) {
                    scope.intersections = limitIntersections(nearby_stops, 5);
                  }
                  else {
                    scope.intersections = null;
                  }
                }, true);

              // All the stations
              } else if (attrs.all) {
                // Show just the subways by default
                scope.intersections = stationDirectory;
              }

              // If they start typing show all intersections
              scope.$watch('searchText', function(query) {
                if (!!query) {
                  scope.intersections = _.filter(stationDirectory.concat(intersectionDirectory), function(intersection){ return intersection.name.toLowerCase().indexOf(query.toLowerCase())===0; });
                }
                else {
                  if (!!attrs.intersections) {
                    scope.intersections = limitIntersections(scope.$eval(attrs.intersections), 5);
                  }
                  else {
                    scope.intersections = null;
                  }
                }
              });

              scope.intersectionClicked = function(station) {
                scope.$emit('gottc.intersection.changed', station);
              };
            }
        };
    }
 ]);

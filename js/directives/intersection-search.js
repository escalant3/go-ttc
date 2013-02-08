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
                scope.$watch(attrs.intersections, function(nearby_stops) {
                  if (_.size(nearby_stops)>5) {
                    nearby_stops = nearby_stops.splice(0, 5);
                  }
                  scope.intersections = nearby_stops;
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
              });

              scope.intersectionClicked = function(station) {
                scope.$emit('gottc.intersection.changed', station);
              };
            }
        };
    }
 ]);

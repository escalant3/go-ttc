angular.module('GoTTC')
.service('ttcStore', [
    '$http',
    '$rootScope',
    function($http, $rootScope) {
        function getNearby(latitude, longitude) {
            $http.jsonp('http://myttc.ca/near/' + latitude + ',' + longitude + '.json?callback=JSON_CALLBACK')
            .success(function(response) {
                $rootScope.$broadcast('gottc.store.nearby.changed', response.locations);
            });
        }

        function getCurrentIntersection(data) {
            if (!!data && data[0]) {
                return data[0];
            }
        }

        function extractDirection(stationUri) {
          if (stationUri.match(/eastbound/)) return "east";
          else if (stationUri.match(/westbound/)) return "west";
          else if (stationUri.match(/northbound/)) return "north";
          else if (stationUri.match(/southbound/)) return "south";
          console.warn("Couldn't find a direction for", stationUri);
        }

        function getIntersectionTimes(stationName) {

          $rootScope.fullScreenLoading = true;

          $http.jsonp('http://myttc.ca/' + stationName + '.json?callback=JSON_CALLBACK')
          .success(function(response) {
              var nextDeparture,
                  nextDepartureTime,
                  stopDirection,
                  departuresToBeShown = {};

              // We only want the next departure. From all the lines
              // in that stop and direction. It is useful to have two
              // but we have to decided which would be the second one
              _.each(response.stops, function(stop) {
                nextDeparture = {};
                stopDirection = extractDirection(stop.uri);
                nextDepartureTime = Number.MAX_VALUE;
                _.each(stop.routes, function(route) {
                  if (route.stop_times[0].departure_timestamp < nextDepartureTime) {
                    nextDeparture.first = route.stop_times[0];
                    nextDeparture.second = route.stop_times[1];
                  }
                });
                if (!nextDeparture.first) return true;
                nextDeparture.stationUri = stop.uri;
                nextDeparture.stationName = stop.name;
                departuresToBeShown[stopDirection] = nextDeparture;

              });
              $rootScope.fullScreenLoading = false;
              $rootScope.$broadcast('gottc.store.intersection-times.changed', departuresToBeShown);
          });
        }

        function getStopTime(station) {
            $http.jsonp('http://myttc.ca/' + station.uri + '.json?callback=JSON_CALLBACK')
              .success(function(response) {
                var times = [];
                _.each(response.stops, function(stop) {
                  if (stop.uri === station.uri) {
                    var minTime = Number.MAX_VALUE;
                    _.each(stop.routes, function(route) {
                      minTime = Math.min(minTime, route.stop_times[0].departure_timestamp);
                    });
                    times.push(moment.unix(minTime).format('dddd'));
                    $rootScope.$broadcast('gottc.store.station-times.changed' + station.uri, times);
                  }
                });

              });
        }

        return {
            getNearby: getNearby,
            getCurrentIntersection: getCurrentIntersection,
            getIntersectionTimes: getIntersectionTimes,
            getStopTime: getStopTime,
            getDirection: extractDirection
        };
    }
]);


angular.module("GoTTC", [])
.controller("MainCtrl", [
    '$scope',
    'ttcStore',
    'favouritesService',
    function($scope, ttcStore, favouritesService) {
        $scope.DEBUG = true;

        $scope.name = "GoTTC!";
        $scope.tab = "nearest";

        $scope.longitude = '-79.396324';
        $scope.latitude = '43.648758';

        $scope.$on('gottc.store.nearby.changed', function(msg, data) {
            $scope.nearby = data;
            $scope.currentIntersection = ttcStore.getCurrentIntersection(data);
        });

        $scope.$on('gottc.store.intersection-times.changed', function(msg, data) {
            $scope.stopHeadingSouthTime = data.south;
            $scope.stopHeadingWestTime = data.west;
            $scope.stopHeadingEastTime = data.east;
            $scope.stopHeadingNorthTime = data.north;
        });

        $scope.changeCurrentIntersection = function(intersection) {
            $scope.currentIntersection = intersection;
            $scope.changeIntersectionRequest = false;
        };

        $scope.$watch('currentIntersection', function(value) {
            if (!!value) {
                ttcStore.getIntersectionTimes(value.uri);
            }
        });

        ttcStore.getNearby($scope.latitude, $scope.longitude);

        $scope.favourites = favouritesService.get();

        // Update the favourites as soon as a new one is added
        $scope.$on('gottc.favourites.changed', function(msg, data) {
          $scope.favourites = favouritesService.get();
        });
    }
])
.service('userService', [
    function() {

        var viewportSize = null;

        var elem = (document.compatMode === "CSS1Compat") ? 
                document.documentElement :
                document.body;

        viewportSize = {
            'width': elem.clientWidth,
            'height': elem.clientHeight
        };

        return {
            viewportWidth: viewportSize.width,
            viewportHeight: viewportSize.height
        }
    }
])
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
                  nextDeparture = null;
                  stopDirection = extractDirection(stop.uri);
                  nextDepartureTime = Number.MAX_VALUE;
                  _.each(stop.routes, function(route) {
                    if (route.stop_times[0].departure_timestamp < nextDepartureTime) {
                      nextDeparture = route.stop_times[0];
                    }
                  });
                  nextDeparture.stationUri = stop.uri;
                  nextDeparture.stationName = stop.name;
                  departuresToBeShown[stopDirection] = nextDeparture;

                });
                $rootScope.$broadcast('gottc.store.intersection-times.changed', departuresToBeShown);
            });
        }

        return {
            getNearby: getNearby,
            getCurrentIntersection: getCurrentIntersection,
            getIntersectionTimes: getIntersectionTimes
        };
    }
])
.service('favouritesService', [
    function() {
      var _initialized = false;
      var _goTTC;
      
      function initialize() {
        var initialValues = {
          config: {},
          favourites: []
        };
        if (!localStorage.getItem('goTTC')) {
          _goTTC = initialValues;
          localStorage.setItem('goTTC', JSON.stringify(_goTTC));
        } else {
          _goTTC = JSON.parse(localStorage.getItem('goTTC'));
        }

        _initialized = true;
      }

      function add(station) {
        var stationCopy;
        if (!_initialized) initialize();
        // TODO Check it is not already there
        stationCopy = {
          name: station.stationName,
          uri: station.stationUri
        };
        _goTTC.favourites.push(stationCopy);
        save();
      }

      function get() {
        if (!_initialized) initialize();
        return _goTTC.favourites;
      }

      function save() {
        if (!_initialized) initialize();
        localStorage.setItem('goTTC', JSON.stringify(_goTTC));
      }

      return {
        add: add,
        get: get
      };
    }
])
.directive('intersectionTime', [
    '$filter',
    'favouritesService',
    function($filter, favouritesService) {
      return {
        scope: true,
        template: '<strong class="route" ng-bind="stopName | getRouteName"></strong><br>' +
                  '<strong><img ng-src="{{compassUrl}}" ng-show="compassUrl" height="18"> {{direction}}</strong>'+ 
                  '<br>{{ firstTime }}<br>{{ secondTime }}' +
                  '<div ng-click="addToFavourites()">Add to Fav.</div>',

        link: function(scope, element, attrs) {
            var _stopInfo = null;

            scope.direction = $filter('capitalize')(attrs.direction);
            scope.$watch(attrs.stopTime, function(value) {
                if (!!value) {
                  _stopInfo = value;
                  scope.stopName = value.shape;
                  scope.firstTime = moment.unix(value.departure_timestamp).fromNow();
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
])
.directive('goTtcMap', [
    'userService',
    function(userService) {
        return {
            scope: true,
            template: '<img ng-src="{{mapSrc}}"/>',
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
                                    '&zoom=18&size=' + userService.viewportWidth + 'x' + parseInt(userService.viewportHeight - 80, 10) + '&maptype=roadmap&sensor=false';
                }

            }


        };
    }
 ])
.directive('iscroll', [
    function() {
      return {
        link: function(scope, elem) {
          // Create the iScroll
          new iScroll('wrapper');
        }
      };
    }
])
.filter('getRouteName',function() {
    return function(name) {
        if (!name) return '';
        positionOfTo = name.toLowerCase().indexOf(' to ');
        if (positionOfTo < 0) return name;
        return name.substr(0,positionOfTo);
    };
})
.filter('capitalize', function() {
    return function(string) {
            return (_.isString(string) && !!string.length) ? string[0].toUpperCase() + string.slice(1) : string;
    };
})
;

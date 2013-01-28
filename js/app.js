angular.module("GoTTC", [])
.controller("MainCtrl", [
    '$scope',
    '$rootScope',
    'ttcStore',
    'favouritesService',
    function($scope, $rootScope, ttcStore, favouritesService) {
        $scope.DEBUG = true;

        $scope.name = "GoTTC!";
        $scope.tab = "nearest";

        $scope.longitude = '-79.396324';
        $scope.latitude = '43.648758';

        $rootScope.fullScreenLoading = false;

        $scope.$on('gottc.store.nearby.changed', function(msg, data) {
          //$rootScope.fullScreenLoading = true
          $scope.nearby = data;
          $scope.currentIntersection = ttcStore.getCurrentIntersection(data);
        });

        $scope.$watch('currentIntersection', function(){
          //$rootScope.fullScreenLoading = false;
        });

        $scope.$on('gottc.store.intersection-times.changed', function(msg, data) {
            $scope.stopHeadingSouthTime = data.south;
            $scope.stopHeadingWestTime = data.west;
            $scope.stopHeadingEastTime = data.east;
            $scope.stopHeadingNorthTime = data.north;
        });

        $scope.changeCurrentIntersection = function(intersection) {
            $scope.currentIntersection = intersection;
            $scope.longitude = intersection.lng;
            $scope.latitude = intersection.lat;
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

        $scope.$on('gottc.store.station-times.changed', function(msg, data) {
          console.log(data);
        });

        $scope.getFavouriteTime = function(station) {
            ttcStore.getStopTime(station);
        };
 
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
        };
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
                    times.push(moment.unix(minTime).fromNow());
                    $rootScope.$broadcast('gottc.store.station-times.changed' + station.uri, times);
                  }
                });

              });
        }

        return {
            getNearby: getNearby,
            getCurrentIntersection: getCurrentIntersection,
            getIntersectionTimes: getIntersectionTimes,
            getStopTime: getStopTime
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
         // new iScroll('wrapper');
        }
      };
    }
])
.directive('favouriteStation', [
    '$timeout',
    'ttcStore',
    function($timeout, ttcStore) {
      return {
        template: '{{ name }} <strong>{{ nextOne}}</strong>',
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


          $timeout(function() {
            if (!!_station) {
              ttcStore.getStopTime(_station);
            }
          }, 5000);

        }
      };
    }
])
.directive('loading', [
  function() {
  return {
    template: '<div ng-show="showLoading"><div class="loading-base"><img src="img/loading.gif" height="{{size}}"></div><p class="loading-message" ng-show="message" ng-bind-html-unsafe="message"></p></div>',
    link: function(scope, element, attrs) {

      scope.showLoading = true;
      scope.message = null;
      scope.size = 64;

      if (!!attrs.message) {
        scope.message = attrs.message;
      }

      if (!!attrs.size) {
        scope.size = attrs.size;
      }

      scope.$watch(attrs.showLoading, function(value){
        if (!!value) {
          scope.showLoading = true;
          return;
        }
        scope.showLoader = false;
      });

    }
  };
}])
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

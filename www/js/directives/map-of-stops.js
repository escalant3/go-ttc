angular.module('GoTTC')
.directive('mapOfStops', [
    'userService',
    '$timeout',
    function(userService, $timeout) {
        return {
            link: function(scope, elem, attrs) {
                scope.$watch(attrs.longitude, function(value) {
                    if (!!value) {
                        scope.longitude = value;
                        // loadMapOfStops();
                        loadStaticMap();
                        if (typeof loadMapOfStops === "function") {
                            loadMapOfStops();
                        }
                    }
                });

                scope.$watch(attrs.latitude, function(value) {
                    if (!!value) {
                        scope.latitude = value;
                        loadStaticMap();
                        if (typeof loadMapOfStops === "function") {
                            loadMapOfStops();
                        }
                    }
                });

                var map_width = userService.viewportWidth,
                    map_height = parseInt(userService.viewportHeight - 65,10);

                var loadStaticMap = function() {
                    var static_map =    'http://maps.googleapis.com/maps/api/staticmap?center=' +
                        scope.latitude + ',' + scope.longitude +
                        '&zoom=18&size='+map_width+'x'+map_height+'&maptype=roadmap&sensor=false';

                    elem.html('<img src="'+static_map+'" width="'+map_width+'" height="'+map_height+'">');
                };

                elem
                    .attr('id','map-of-stops-canvas')
                    .css('width',map_width+'px')
                    .css('height',map_height+'px');

                var map,
                    loadMapOfStops;

                $timeout(function(){

                    loadMapOfStops = function() {

                        var mapOptions = {
                          zoom: 18,
                          center: new google.maps.LatLng(scope.latitude, scope.longitude),
                          disableDefaultUI: true,
                          mapTypeId: google.maps.MapTypeId.ROADMAP
                        };
                        map = new google.maps.Map(document.getElementById('map-of-stops-canvas'),
                            mapOptions);

                        if (_.size(elem.find('img'))>0) {
                            elem.find('img').remove();
                        }

                    }

                    google.maps.event.addDomListener(window, 'load', loadMapOfStops);
                    loadMapOfStops();

                }, 5000);

            }


        };
    }
 ]);
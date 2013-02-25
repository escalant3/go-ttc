angular.module('GoTTC')
.directive('mapOfStops', [
    'userService',
    function(userService) {
        return {
            link: function(scope, elem, attrs) {
                scope.$watch(attrs.longitude, function(value) {
                    if (!!value) {
                        scope.longitude = value;
                        loadMapOfStops();
                    }
                });

                scope.$watch(attrs.latitude, function(value) {
                    if (!!value) {
                        scope.latitude = value;
                        loadMapOfStops();
                    }
                });

                elem
                    .attr('id','map-of-stops-canvas')
                    .css('width',userService.viewportWidth+'px')
                    .css('height',parseInt(userService.viewportHeight - 65,10)+'px');

                var map;

                function loadMapOfStops() {

                    var mapOptions = {
                      zoom: 18,
                      center: new google.maps.LatLng(scope.latitude, scope.longitude),
                      disableDefaultUI: true,
                      mapTypeId: google.maps.MapTypeId.ROADMAP
                    };
                    map = new google.maps.Map(document.getElementById('map-of-stops-canvas'),
                        mapOptions);

                }

                google.maps.event.addDomListener(window, 'load', loadMapOfStops);

            }


        };
    }
 ]);
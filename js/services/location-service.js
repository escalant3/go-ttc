angular.module('GoTTC')
.service('locationService', [
    '$rootScope',
    function($rootScope) {

      function getLocation() {
        navigator.geolocation.getCurrentPosition(successCallback);
      }

      function successCallback(position) {
        if (!!position.coords) {
          $rootScope.$broadcast('gottc.position.changed', position.coords);
        }
      }

      if (!!navigator.geolocation) {
        getLocation();
        //setInterval(getLocation, GEOLOCATION_REFRESH_INTERVAL);
      }

      function getCompassUrl (direction) {
          if (!direction) return null;
          return 'img/' + direction.toLowerCase() + '.png';
      }

      return {
        getLocation: getLocation,
        getCompassUrl: getCompassUrl
      };

    }
]);

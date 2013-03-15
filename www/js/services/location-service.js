angular.module('GoTTC')
.service('locationService', [
    '$rootScope',
    function($rootScope) {

      function getLocation() {
        navigator.geolocation.getCurrentPosition(successCallback);
      }

      function successCallback(position) {
        if (!!position.coords) {
          $rootScope.$broadcast('gottc.position.changed', position.coords, true);
        }
      }

      if (!!navigator.geolocation) {
        getLocation();
        //setInterval(getLocation, GEOLOCATION_REFRESH_INTERVAL);
      }

      function getCompassUrl (direction, size) {
          if (!direction) return null;
          if (!size) size = 32;
          return 'img/compass-' + direction.toLowerCase() + '-' + size + '.png';
      }

      return {
        getLocation: getLocation,
        getCompassUrl: getCompassUrl
      };

    }
]);

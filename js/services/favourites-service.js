angular.module('GoTTC')
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
        var stationCopy, favouriteExists;
        if (!_initialized) initialize();
        // TODO Check it is not already there
        stationCopy = {
          name: station.stationName,
          uri: station.stationUri
        };
        favouriteExists = _.contains(_.pluck(_goTTC.favourites, 'uri'), stationCopy.uri);
        if (!favouriteExists) {
          _goTTC.favourites.push(stationCopy);
          save();
        }
      }

      function get() {
        if (!_initialized) initialize();
        return _goTTC.favourites;
      }

      function remove(station) {
        if (!_initialized) initialize();

        _.each(_goTTC.favourites, function(favourite, index) {
          if (favourite.name === station.name) {
            _goTTC.favourites.splice(index, 1);
            save();
            return false;
          }
        });
      }

      function save() {
        if (!_initialized) initialize();
        localStorage.setItem('goTTC', JSON.stringify(_goTTC));
      }

      return {
        add: add,
        get: get,
        remove: remove
      };
    }
]);


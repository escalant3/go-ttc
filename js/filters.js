angular.module('GoTTC')
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

angular.module('GoTTC')
.filter('getRouteName',function() {
    return function(name) {
        if (!name) return '';
        // Queen to Neville Park
        delimiter = name.toLowerCase().indexOf(' to ');
        if (delimiter >= 0) return name.substr(0,delimiter);
        // Westbound on College
        delimiter = name.toLowerCase().indexOf(' on ');
        if (delimiter >= 0) return name.substr(delimiter+4);
        return name; 
    };
})
.filter('capitalize', function() {
    return function(string) {
            return (_.isString(string) && !!string.length) ? string[0].toUpperCase() + string.slice(1) : string;
    };
})
;

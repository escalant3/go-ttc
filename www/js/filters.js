angular.module('GoTTC')
.filter('getRouteName',function() {
    return function(name) {
        if (!name) return '';
        // If there are any numbers in the route name like 501K remove them
        name = name.replace(/^[\d]+.*?\s+/g, '');
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
.filter('abbreviateTime',function() {
    return function(humanizedTime) {
        var number = 1;

        if (!humanizedTime) return null;

        if (humanizedTime.match(/hour/)) {
          if (humanizedTime.match(/\b\d+\b/g)) number = humanizedTime.match(/\b\d+\b/g)[0];
          return number+"h";
        }
        // The next vehicle is not hours away. Let's try minutes
        number = 1;
        if (humanizedTime.match(/minute/)) {
          if (humanizedTime.match(/\b\d+\b/g)) number = humanizedTime.match(/\b\d+\b/g);
          return number+"m";
        }
        number = 1;
        if (humanizedTime.match(/second/)) {
          if (humanizedTime.match(/\b\d+\b/g)) number = humanizedTime.match(/\b\d+\b/g);
          return number+"s";
        }
    };
})
;

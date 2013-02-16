angular.module('GoTTC')
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
]);


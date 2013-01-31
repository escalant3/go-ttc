angular.module('GoTTC')
.directive('loading', [
  function() {
  return {
    template: '<div ng-show="showLoading"><div class="loading-base"><img src="img/loading.gif" height="{{size}}"></div><p class="loading-message" ng-show="message" ng-bind-html-unsafe="message"></p></div>',
    link: function(scope, element, attrs) {

      scope.showLoading = true;
      scope.message = null;
      scope.size = 80;

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
}]);

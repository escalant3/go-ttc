angular.module('GoTTC')
.directive('iscroll', [
    function() {
      return {
        scope: {
          elements: '=elements',
          filter: '=filter',
          options: '&options',
          clickOnElement: '=clickOnElement'
        },
        template: '<ul class="iscroll-list">' +
                  '<li ng-repeat="element in elements | filter: filter" ng-bind="element.name" ' +
                  'class="iscroll-element clickable" ng-class-even="\'alt\'" ' +
                  'ng-click="elementClicked(element)"></li></ul>',
        link: function(scope, elem, attrs) {
          var _iscrollObj;

          // If an ID is not provided create it
          if (!elem.attr('id')) {
            elem.attr('id', 'id_' + scope.$id);
          }

          // Create the iScroll
          _iscrollObj = new iScroll(elem.attr('id'), scope.options() || {});

          scope.$watch('elements', function(value) {
            setTimeout(function() {
                _iscrollObj.refresh();
              }, 1000);
          });

          // Parameters handlers
          if (!!attrs.filter) {
            scope.$watch('filter', function(value) {
              setTimeout(function() {
                _iscrollObj.refresh();
              }, 1000);
            });
          }

          // On-click handler
          scope.elementClicked = function(e) {
            if (typeof scope.clickOnElement === "function") {
              scope.clickOnElement(e);
            }
          };
        }
      };
    }
]);

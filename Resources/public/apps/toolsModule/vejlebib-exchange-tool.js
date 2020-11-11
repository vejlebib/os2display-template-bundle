/**
 * @file
 * Contains a slide tool to add emails to slide.options.resources array.
 */

/**
 * Tool: vejlebib-exchange-tool.
 */
angular.module('toolsModule').directive('vejlebibExchangeTool', [
  function () {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        slide: '=',
        close: '&'
      },
      link: function (scope) {
        scope.email = "";
        scope.location = "";

        /**
         * Add new resource with scope.email to resources.
         */
        scope.addEmail = function () {
          // Make sure slide.option.resources field is created.
          if (!scope.slide.options.hasOwnProperty('resources')) {
            scope.slide.options.resources = [];
          }

          // Only add resource if e-mail was specified.
          if (scope.email === '') {
            return;
          }

          var resource = {
            mail: scope.email,
            location: scope.location
          };

          // Add to resources.
          scope.slide.options.resources.push(resource);
        };

        /**
         * Remove an email from index in resources.
         *
         * @param index
         */
        scope.removeEmail = function (index) {
          scope.slide.options.resources.splice(index, 1);
        };
      },
      templateUrl: '/bundles/vejlebibos2displaytemplate/apps/toolsModule/vejlebib-exchange-tool.html'
    };
  }
]);

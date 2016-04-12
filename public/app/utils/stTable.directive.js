(function() {
  'use strict'
  
  /**
	 * Directiva stTable
	 */

  
angular.module('app').directive("expose", function() {
		 return {
				restrict: 'EA',
				require: '^stTable',
				link: function(scope, element, attrs, ctrl) {
					scope.mc.controlTabla = ctrl;					
				}
					
		};
});

})();
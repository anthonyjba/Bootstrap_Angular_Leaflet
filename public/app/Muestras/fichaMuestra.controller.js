 (function () {
  'use strict';
		
	/**
	 * Ficha Muestra Controller
	 */
 angular.module('app')
 .controller('fichaMuestraController', Controller);


function Controller(cargaDatosService, PotencialAgrologicoService, DetalleMuestraService, $scope, $state, $stateParams, $q) {
     
    $scope.statename = $state.current.name;
    
    console.log("fichaMuestraController initialized!");
    
    if($stateParams.param != ""){
      
      $scope.refcat = $stateParams.param;
      
      //Web Service del Potencial Agrológico 
      var promiseTURC = PotencialAgrologicoService.getData($scope.refcat);     
      promiseTURC.then(
        function (data) {
          $scope.Ficha_TURC = data;
        }
      );
      
      //Web Service del Detalle de la muestra
      DetalleMuestraService.getData('11','11032A0', '0100063')
      .then(
          function (data) {            
            $scope.Ficha_Detalle = DetalleMuestraService.parseData(data);
        }
      );
      
    }
    
 }


})();

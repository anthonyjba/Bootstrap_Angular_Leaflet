(function() {
  'use strict'
  
  // service
  angular
    .module('app')
    .factory('PotencialAgrologicoService', service);
  
  function service(cargaDatosService) {
  
      ////////////////////////////////////////////////////////////////////////
      // public API
      var ms = {
          /*Getters*/
          getData: getData          
      };
      return ms;
    
    
    function getData(refcat){
      
      this.url = 'http://10.57.224.242/wsservicios/PotencialAgrologicoServicio.svc/ObtenerParcela?referencia=' + refcat;
      
      return cargaDatosService.get_JSONP(this.url);
      
    }
        
  }
  
})();

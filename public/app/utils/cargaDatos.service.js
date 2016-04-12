(function () {
    'use strict';

    /**
	 * Servicio de Cubo
	 */
    angular
	  .module('app')
	  .factory('cargaDatosService', service);

    function service($http, $q) {

        var url = 'data/Cubo/cubo.json';                
        var datos = null;
        
                
        ////////////////////////////////////////////////////////////////////////
        // public API
        var ms = {
            cargaDatos: cargaDatos,            
            /*Getters*/
            get_JSONP : get_JSONP,
            get_datos: get_datos,            
        };
        return ms;

        ///////////////////////////////////////////////////////////
        // Funciones Publicas		

        // Inicialización 
        function init() {


        };

        //Get Datos
        function get_JSONP(url){
          var deferred  = $q.defer();
          //var metodo = (typeof method === 'undefined') ? 'GET' : JSONP;
          
          $http({method: 'JSONP', 
                  url: url,
                  params: {
                      callback: 'JSON_CALLBACK'                      
                  } 
          })
          .then(function(object){
              deferred.resolve(object.data);
          }         
          , function(err) {
              console.log("error");
              deferred.reject(err); }
          );
    
          return deferred.promise;
        }

        // Inicialización del cubo
        function cargaDatos() {

            var defered = $q.defer();
            var promise = defered.promise;
                                                
                $http({
                    method: 'GET',
                    url: url,
                    params:{
                      referencia : '11039A05500150'
                    }
                }).success(function (data) {
                    datos = data;
                    defered.resolve(datos);
                }).error(function (err) {
                    console.log("error");
                    datos = null;
                    defered.reject(err);
                }).finally(function () {
                  
                    console.log('Finally Carga Datos', new Date());
                  
                });
                return promise;           
        };

      

        function get_datos() {
            return datos;
        };        
    }
})();
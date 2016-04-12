(function () {
    'use strict';

    /**
	 * Servicio de Cubo
	 */
    angular
	  .module('app')
	  .factory('cubeService', service);
    

    function service($http, $q) {


        ////////////////////////////////////////////////////////////////////////
        // public API
        var ms = {
            init: init,
            /*Filtro*/
            ejecutaFiltro: ejecutaFiltro,
            getItemTrue: getItemTrue,
            getItemFalse: getItemFalse
        };
        return ms;



        ///////////////////////////////////////////////////////////
        // Funciones Publicas		

        // Inicialización
        function init() {


        };


        /*Funcion que ejecuta un filtrado del cubo por un objeto*/
        function ejecutaFiltro(cubo, objetoFiltrado) {


            var data = cubo; /*--> OJO estamos apuntando dos variables al mismo obeto. Quizás habría que duplicar o traerlo otra vez */

            /****FILTRADO****/
            for (var filtro in objetoFiltrado) {
                var capa = objetoFiltrado[filtro];

                if (capa["condicion"]) {
                    data = getItemTrue(data, filtro, capa["valor"]);
                } else {
                    data = getItemFalse(data, filtro, capa["valor"]);
                }
                console.log(data.length);
            };
            return data;
        };






        /**************FUNCIONES AUXILIARES*****************/
        /*Realiza un filtro a un objetoJson por un atributo y un valor*/
        function getItemTrue(objetoJson, atributo, filtro) {
            return objetoJson.filter(
				function (Objeto) {
				    return (Objeto[atributo] == filtro)
				}
			);
        }

        /*Realiza un filtro excluyente a un objetoJson por un atributo y un valor*/
        function getItemFalse(objetoJson, atributo, filtro) {
            return objetoJson.filter(
				function (Objeto) {
				    return (Objeto[atributo] != filtro)
				}
			);
        }

    }
    
})();

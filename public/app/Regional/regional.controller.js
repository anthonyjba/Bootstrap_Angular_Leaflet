(function() {
  'use strict'
  
  /**
	 * Ficha Muestra Controller
	 */
  angular.module('app')
  .controller('regionalController', Controller);
  
  function Controller(cargaDatosService, mapService, $scope, $state, $stateParams, $q) {
    
    var vm = this;
     
    console.log("Mapa Regional initialized!");
    
    /********************** MAPAS ************************************************/	
    //1.- INICIALIZACIÓN DEL MAPA
    vm.mapaRegiones = mapService.creaMapa('map');
		mapService.loadRegiones(vm.mapaRegiones);
    
    /*******************************************************************************/
    
    /*Cargamos el cubo*/	    
    //Peticion para cargar los datos
    var promesaMulti = $q.all(
      [cargaDatosService.cargaDatos()]);
    promesaMulti
      .then(function (data) {
        
        var objdata = cargaDatosService.get_datos();

        //ArrayFilter
        // var start = new Date();
        // var filtro = {
        //   'AC': { "valor": null, "condicion": true },
        //   'ARH': { "valor": null, "condicion": true },
        //   'CCAA': { "valor": null, "condicion": false },
        //   'EFEC': { "valor": null, "condicion": true },
        //   'EXPL': { "valor": null, "condicion": true },
        //   'IAMI': { "valor": null, "condicion": true },
        //   'ORIG': { "valor": null, "condicion": true },
        //   'PROV': { "valor": null, "condicion": true }
        // };

        // var datos = cubeService.ejecutaFiltro(objdata, filtro);
        // console.log("Time of Array.Filter: " + new Date().setTime(new Date().getTime() - start.getTime()) + " ms ");
                
        /* crossfilter */
        var startCF = new Date();
        var cRegiones = crossfilter(objdata);
        
        var dim_AC = cRegiones.dimension(function(d){return "" + d.AC}),
            dim_ARH = cRegiones.dimension(function(d){return +d.ARH}),
            dim_CCAA = cRegiones.dimension(function(d){return +d.CCAA}),
            dim_EFEC = cRegiones.dimension(function(d){return +d.EFEC}),
            dim_EXPL = cRegiones.dimension(function(d){return "" + d.EXPL}),
            dim_IAMI = cRegiones.dimension(function(d){return +d.IAMI}),
            dim_ORIG = cRegiones.dimension(function(d){return "" + d.ORIG}),
            dim_PROV = cRegiones.dimension(function(d){return +d.PROV});
        
        var f1 = dim_AC.filterExact('null').top(Infinity);
        console.log("f1",f1.length);    
        var f2 = dim_ARH.filterExact(null).top(Infinity);
        console.log("f2",f2.length);
        var f3 = dim_CCAA.filterRange([1,18]).top(Infinity);
        console.log("f3",f3.length);
        var f4 = dim_EFEC.filterExact(null).top(Infinity);
        console.log("f4",f4.length);
        var f5 =dim_EXPL.filterExact('null').top(Infinity);
        console.log("f5",f5.length);
        var f6 =dim_IAMI.filterExact(null).top(Infinity);
        console.log("f6",f6.length);
        var f7 =dim_ORIG.filterExact('null').top(Infinity);
        console.log("f7",f7.length);
        var f8 =dim_PROV.filterExact(null).top(Infinity);
        console.log("f8",f8.length);
        
        console.log("Time of crossfilter: " + new Date().setTime(new Date().getTime() - startCF.getTime()) + " ms ");
        
        console.log(f8);

        vm.crearTabla(f8);
        
      }, function (error) {
        alert('error');
      })
      .finally(function () {

      });
    /********************************************************************************************/
    
    /******************************Tabla***********************************************************/
	  /************Inicializacion del store de la tabla****************/
		vm.rowCollection = [];
	    /***********Cargamos la tabla******************************/
		vm.crearTabla = function (data) {		  		    		    
		    vm.rowCollection = data;		  
		}
    
    vm.init = function () {

    }
  }
  
})();
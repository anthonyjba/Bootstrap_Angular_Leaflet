(function () {
	'use strict';

	/**
	 * Map Service
	 */
	angular
	  .module('app')
	  .factory('mapService', service);

	function service() {
				
		var defaults = {
			 zoom: 6,
			 startLocation: [39.80,-2.50]			 	
		 };
		
    
		// public API
		var ms = {
		    init: init,
		    creaMapa: creaMapa,
		    loadRegiones: loadRegiones,		    
		    //getLayerByName: getLayerByName,
		    seleccionaFeatureByCapaCampoValor: seleccionaFeatureByCapaCampoValor,
		    borraSeleccionCapa:borraSeleccionCapa,
		    obtieneObjetoCampoValor: obtieneObjetoCampoValor,
        centradoCapa:centradoCapa
		};
		return ms;
		
		///////////////////////////////////////////////////////////
	    // Funciones  
	    ///////////////////////////////////////////////////////////

		
		
		
		//////////////////////////////////////////////////////////////////
		// Inicialización del mapa
		function init(config) {
			var config = angular.extend(defaults, config);			
		} //Fin método de inicialización del mapa
        


		function creaMapa(div, config) {

		    var config = angular.extend(defaults, config);
		            
        var map = new L.Map(div, {maxZoom:10,minZoom:3})
        
        new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map)
        
        map.setView(config.startLocation, config.zoom);
     
		    return map;
		}

    

		function loadRegiones(map) {
      var topoLayer = new L.TopoJSON();
      topoLayer.addData(OCMI_CCAA_IGN);
      topoLayer.addTo(map);
      topoLayer.eachLayer(handleLayer);      
		}
    
    function handleLayer(layer){
        layer.setStyle({
          fillColor : '#47A0C2',
          fillOpacity: 1,
          color:'#fff',
          weight:1,
          opacity:.5
        });
        
        layer.on({
          mouseover : enterLayer,
          mouseout: leaveLayer
        });
    }

	  /********************Utilidades****************/
    
    function enterLayer(){
      var regionName = this.feature.properties.DENOMINACION_CCAA_IGN;
      $('.region-name').text(regionName).show();
      
      this.bringToFront();
      this.setStyle({
        weight:2,
        opacity: 1
      });
    }
    function leaveLayer(){
      $('.region-name').hide();
      this.bringToBack();
      this.setStyle({
        weight:1,
        opacity:.5
      });
    }
   /* 
		function getLayerByName(map, name) {
		    var layer = null;
		    map.getLayers().forEach(function (lyr) {
		        if (name == lyr.get('name')) {
		            layer = lyr;
		        }
		    });
		    return layer;
		}
*/

        /*Funcion que dada una capa, un campo y un valor, realiza una busqueda en la capa y devuelve una feature*/
		function obtieneObjetoCampoValor(capa, campo, valor) {
		    var feature = null;


		    var featuresArray = capa
								.getSource()
									.getFeatures()
										.forEach(function (item, i) {
										    var f = item.get(campo);
										    if (valor == f)
										        feature = item;
										    return feature;
										});
		    return feature;
		};


		function seleccionaFeatureByCapaCampoValor(map, lyr, campo, valor, panToFeature) {


		    var feature = obtieneObjetoCampoValor(lyr, campo, valor);
		    var interactionSelect = null;

		    if (feature != null) {

		        //Añadir a selección
		        map.getInteractions().forEach(function (interaction) {
		            if (interaction instanceof ol.interaction.Select) {

		                var featuresSeleccionadas = interaction.getFeatures();
		                featuresSeleccionadas.clear();
		                featuresSeleccionadas.push(feature);
		                interactionSelect = interaction;
		            }
		        });
		        //Centrar
		        if (panToFeature) {
		            panToFeatureFunction(map, feature, map.getView().getZoom());
		        }

		    }
		    return interactionSelect;
		};

		function borraSeleccionCapa(map, lyr) {
		    
		        //Añadir a selección
		        map.getInteractions().forEach(function (interaction) {
		            if (interaction instanceof ol.interaction.Select) {

		                var featuresSeleccionadas = interaction.getFeatures();
		                featuresSeleccionadas.clear();		                
		            }
		        });		        		    
		};



		function panToFeatureFunction(map, feature, zoom) {

		    var extent = feature.getGeometry().getExtent();
		    var lonLat = ol.extent.getCenter(extent);


		    /*var lonLat = feature.getGeometry().getCoordinates()*/

		    var olPixel = map.getPixelFromCoordinate(lonLat);
		    olPixel[1] -= 40;
		    lonLat = map.getCoordinateFromPixel(olPixel);

		    if (map.getView().getZoom() < zoom)
		        map.getView().setZoom(zoom);

		    var animation = ol.animation.pan({
		        duration: 500,
		        easing: eval(ol.easing.inAndOut),
		        source: map.getView().getCenter()
		    });

		    // Add animation to the render pipeline
		    map.beforeRender(animation);
		    // Change center location
		    map.getView().setCenter(lonLat);
		};


		function centradoCapa(map, capa) {

		    map.getView().fit(capa.getSource().getExtent(), map.getSize());


		}


	}



	
})();

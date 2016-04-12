(function () {
  'use strict'

  // service
  angular
    .module('app')
    .factory('DetalleMuestraService', service);

  function service(cargaDatosService) {
  
    ////////////////////////////////////////////////////////////////////////
    // public API
    var ms = {
      /*Getters*/
      getData: getData,
      parseData: parseData
    };
    return ms;


    function getData(vpd, pcat1, pcat2) {
      
      //var url = 'http://10.57.224.242/wsservicios/MuestrasRusticasServicio.svc/BuscarDetalleMuestraRustica?VPD=11&pCatastral1=11032A0&pCatastral2=0100063';
      this.url = 'http://10.57.224.242/wsservicios/MuestrasRusticasServicio.svc/BuscarDetalleMuestraRustica?' +
      'vpd=' + vpd + '&pCatastral1=' + pcat1 + '&pCatastral2=' + pcat2;

      return cargaDatosService.get_JSONP(this.url);
    }

    function parseData(data){
      var origen = ObtenerOrigen(data[0].Origen);
      var fechaEfecto = parseMSDate(data[0].FechaEfectos);
      var vcValorEuroHectarea = (data[0].Inmueble.ValorCatastral / (data[0].Inmueble.SuperficieSolar / 10000));
      var vcRM = formatoNumero(((data[0].Inmueble.ValorCatastral / data[0].ValorTransmision) * 100) / 100);
      var vrRM = formatoNumero((data[0].ValorCalculadoParcela / data[0].ValorTransmision * 10000) / 10000);
      
      var resultado = {
                    MuestraDelegacion: data[0].Delegacion.Descripcion,
                    MuestraMunicipio: data[0].Municipio.Descripcion,
                    MuestraHoja: data[0].Hoja,
                    MuestraPoligono: data[0].Poligono,
                    MuestraParcela: data[0].Parcela,
                    MuestraPCatastral1: data[0].PCatastral1,
                    MuestraPCatastral2: data[0].PCatastral2,
                    MuestraOrigen: origen,
                    //MuestraCargo: datos.Cargo,
                    MuestraValorTransmision: formatoEuro(data[0].ValorTransmision),
                    MuestraNumeroProtocolo: data[0].NumeroProtocolo,
                    MuestraFechaEfecto: fechaEfecto.toLocaleDateString('es-ES'),
                    MuestraNumeroEnvio: data[0].NumeroEnvio,
                    MuestraTipoOperacion: data[0].TipoOperacion,
                    InmuebleARH: data[0].ARH,
                    InmuebleSuperficieSolar: data[0].Inmueble.SuperficieSolar,
                    InmuebleSuperficieConstruida: data[0].Inmueble.SuperficieConstruida,
                    VCRM: vcRM,
                    VCValorSuelo: formatoEuro(data[0].Inmueble.VCValorSuelo),
                    VCValorConstruccion: formatoEuro(data[0].Inmueble.ValorConstruccion),
                    VCValorCatastral: formatoEuro(data[0].Inmueble.ValorCatastral),
                    VCValorEuroHectarea: formatoEuro(vcValorEuroHectarea),
                    VRRM: vrRM,
                    VRValorReferencia: formatoEuro(data[0].ValorCalculadoParcela)
                    //VRValorReferenciaSuelo: vrValorReferenciaSuelo,
                    //VRValorEuroHectarea: vrValorEuroHectarea
                };

      return resultado; 
      
    }

    function ObtenerOrigen(origen) {
      switch (origen) {
        case 0: return "Notarios"; break;
        case 1: return "Registradores"; break;
        case 2: return "Tasaciones"; break;
      }
    }

  }


})();
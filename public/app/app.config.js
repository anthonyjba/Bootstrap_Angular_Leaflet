(function (angular) {
  'use strict';
		
	/**
	 * Main Controller
	 */
  angular
    .module('app', ['ui.router','ngSanitize','smart-table'])
    .controller('MainController', Controller)
    .config(Config);
    
    Controller.$inject = [    
    '$scope',    
    '$state',
    '$filter',
    '$http',
    '$q'
  ];
    
      function Controller ($scope, $state, filter, $http, $q) {
        var vm = this;
        
        $state.go("home");                
        console.log("home initialized!");
        
        /*************BOTONES MENÚ***************************************************************************/
        vm.accionBoton1 = function () {
            alert('Botón 1');
        };

        vm.accionBoton2 = function () {
            alert('Botón 2');
        };
        
        vm.init = function () {

        }

    };

   function Config ($urlRouterProvider, $stateProvider, $locationProvider, $httpProvider) {
      
      $urlRouterProvider
        .when('', '/home')
        .when('/RefCat/','/home')
        .when('/Regional', ['$state', function ($state) {
          $state.go("regional");
        }])
        .when('/refCat/:param',['$state', function ($state, myService) {
            $state.go('RefCat', {id: myService.Params.id});
        }]);
     
      
      $stateProvider
      .state('home', {
          url: "/home",
              templateUrl: "app/Muestras/partials/noRC.html",
              onEnter: function () {
                    console.log("entered home state");
              }
          })
      .state('RefCat', {
            url: "/RefCat/:param",
            templateUrl: "app/Muestras/partials/fichaMuestra.html",
            controller: "fichaMuestraController"
          }) 
      .state('regional', {
            url: "/Regional",
            templateUrl: 'app/Regional/partials/regional.html',
              controller: 'regionalController',
              controllerAs: "rc"
          })      
      
   }
   
})(window.angular);
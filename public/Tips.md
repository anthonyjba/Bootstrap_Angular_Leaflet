# ng-bind-html  
  * sample to bind html with scope: $scope.Content_html = '<span>my own content html</span>'
  
  ```html
  <p ng-bind-html="Content_html">
  ```
  
  ```html
  https://ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular-route.js
  
  <pre>$location.path() = {{$location.path()}}</pre>
  <pre>$route.current.templateUrl = {{$route.current.templateUrl}}</pre>
  <pre>$route.current.params = {{$route.current.params}}</pre>
  <pre>$route.current.scope.name = {{$route.current.scope.name}}</pre>
  <pre>$routeParams = {{$routeParams}}</pre>
 
  ```
  
  Controler.js
  ```js
      
      $routeProvider
        .when('/refcat/:param', {
          templateUrl: "app/Muestras/fichaMuestra.html",
          controller: "fichaMuestraController",
          resolve: {
            // I will cause a 1 second delay
            delay: function($q, $timeout) {
              var delay = $q.defer();
              $timeout(delay.resolve, 1000);
              return delay.promise;
              }
          }
        }).
        otherwise({
            redirectTo: '/index.html'
        });

      //$routeProvider.otherwise({redirectTo: '/fichaMuestra'});
      $locationProvider.html5Mode(true);
    }
```

# Multiple Views
```js
      views: {
        'regional': {
          templateUrl: 'app/Regional/partials/regional.html',
          controller: 'regionalController'
        },
        'fichaMuestra': {
          templateUrl: 'app/Muestras/partials/noRC.html'
        }            
      }
```
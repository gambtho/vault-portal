angular.module('myApp.authentication', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/authentication', {
    templateUrl: 'authentication/authentication.html',
    controller: 'AuthenticationCtrl'
  });
}])

.controller('AuthenticationCtrl', [function() {

  return {
    
    login: function(){
      return true;
    }
  
  }


}]);

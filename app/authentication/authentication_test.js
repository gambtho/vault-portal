'use strict';
var sandbox, authenticationCtrl, login;

beforeEach(module('myApp.authentication.ctrl'));

describe('myApp.authentication.view', function() {

  //beforeEach(function() {
  //  inject(function ($injector) {
  //        sandbox = sinon.sandbox.create();
  //        authenticationCtrl = $injector.get('AuthenticationCtrl');
  //        login = $injector.get('login');
  //    })
  //});


  describe('auth controller', function(){

    it('should ....', inject(function($controller) {
      var authenticationCtrl = $controller('LoginController');
      expect(authenticationCtrl).toBeDefined();
      expect(authenticationCtrl.login).toBeDefined();
    }));

    it('should authenticate the user', inject(function($controller){

     debugger; 
    
    }));
  });
});

'use strict';
var sandbox, authenticationService, login;

describe('myApp.authentication.view', function() {

  beforeEach(function(){
    debugger;
    //module('myApp.authentication');
    inject(function ($injector) {
      debugger;
          sandbox = sinon.sandbox.create();
          authenticationService = $injector.get('myService');
          login = $injector.get('somethingUnderTest');
          debugger;
      })
  });

  describe('view1 controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var authenticationCtrl = $controller('AuthenticationCtrl');
      expect(authenticationCtrl).toBeDefined();
      expect(authenticationCtrl.login).toBeDefined();
    }));

    it('should authenticate the user', inject(function($controller){
    
     debugger; 
    
    }));
  });
});

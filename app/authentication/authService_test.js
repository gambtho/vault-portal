//Interesting things to test the Auth service for

// Logging in with Facebook
// Handling callback to server for checkuser
// Saving user to localstorage after login
// Logging out (removing user object as well as localstorage)

describe("Auth Service Unit Tests", function() {

    beforeEach(function() {
        module('myApp.authentication.service');
    });

    // instantiate service
    var apiResponse = {
        name: 'Josh Bavari',
        email: 'jbavari@gmail.com',
        id: '4409480064'
    };
    var Auth;
    var FB = {
        init: function() {

        },
        login: function() {

        },
        api: function(url, params, callback ) {
            return callback(apiResponse);
        }
    };
    var FacebookConnect = {
        login: FB.login
    };
    var httpBackend = null;

    beforeEach(inject(function (_Auth_) {
        Auth = _Auth_;
    }));

    it('should have Auth service be defined', function () {
        expect(Auth).toBeDefined();
    });

    it('should not have a user existing upon starting up', function() {
        expect(Auth.currentUser()).toBe(null);
    });

    it('should save a user', function() {
        var user = { name: 'Josh Bavari', id: 1 };

        Auth.saveUser(user);
        var currUser = Auth.currentUser();
        expect(currUser.name).toBe(user.name);
        expect(currUser.id).toBe(user.id);
    });

    it('should have a user in local storage after calling saveUser', function() {
        var user = { name: 'Josh Bavari', id: 1 };

        Auth.saveUser(user);

        var localUser = JSON.parse(window.localStorage.getItem('user'));

        expect(localUser.name).toBe(user.name);
        expect(localUser.id).toBe(user.id);
    });

    it('should remove the user from local storage after logging out', function() {
        var user = { name: 'Josh Bavari', id: 1 };

        Auth.saveUser(user);

        var localUser = JSON.parse(window.localStorage.getItem('user'));

        expect(localUser.name).toBe(user.name);
        expect(localUser.id).toBe(user.id);

        Auth.logout();

        expect(Auth.currentUser()).toBe(null);
    });

    describe('Mocked HTTP Requests', function() {

        var $httpBackend;
        var name = 'Josh Bavari';
        var email = 'jbavari@gmail.com';

        beforeEach(inject(function($injector) {
            // Set up the mock http service responses
            $httpBackend = $injector.get('$httpBackend');
            $httpBackend.when('POST', 'http://raisemore.dev/api/v1/user/checkuser')
                .respond(200, {name: name, email: email, success: true});
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });


        xit('should have sent a POST request to the checkuser API', function() {
            var result = Auth.checkUser(name, email, 1, '4408064001', null);
            $httpBackend.expectPOST('http://raisemore.dev/api/v1/user/checkuser');
            $httpBackend.flush();
        });

    });

});

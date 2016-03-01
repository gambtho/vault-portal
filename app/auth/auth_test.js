//http://www.benlesh.com/2013/05/angularjs-unit-testing-controllers.html
//http://www.bradoncode.com/blog/2015/07/13/unit-test-promises-angualrjs-q/


describe('Auth', function() {


    var valid_response = '{"auth": { "client_token": "efc845e5-e02f-cd28-ece0-32ed00c23afd"} }';
    var invalid_response = '{"errors":["invalid user ID or app ID"]}';

    beforeEach(function () {

        module('vaultPortal.auth');
    });

    describe('controller', function() {
        var $scope, ctrl, $q, defer, spy;

        beforeEach(function () {

            inject(function ($rootScope, $controller, _$q_, auth) {
                $q = _$q_;
                $scope = $rootScope;

                defer = _$q_.defer();

                spy = spyOn(auth, 'login').and.returnValue(defer.promise);

                ctrl = $controller('loginController', {
                    $scope: $scope,
                    auth: auth
                });
            });

        });

        it('should have login controller defined', function () {
            expect(ctrl).toBeDefined();
        });

        xit('should start with user and password not populated', function () {
            expect($scope.username).toEqual('');
            expect($scope.password).toEqual('');
        });

        it('should store token when valid user and password are provided', function () {
            defer.resolve("blah");
            $scope.url = 'url';
            $scope.username = 'user';
            $scope.password = 'password';

            $scope.login();
            $scope.$apply();

            expect(spy).toHaveBeenCalledWith('url', 'user', 'password');
            expect($scope.token).toEqual('blah');
        });

        it('should not store a token when in-valid user and password are provided', function () {
            defer.reject();
            $scope.url = 'url';
            $scope.username = 'bad-user';
            $scope.password = 'bad-password';

            $scope.login();
            $scope.$apply();

            expect(spy).toHaveBeenCalledWith('url', 'bad-user', 'bad-password');
            expect($scope.token).toEqual('');
        });
    });

    describe('service', function() {
        var httpBackend, auth;

        beforeEach(function () {

            inject(function ($httpBackend, _auth_) {
                auth = _auth_;
                httpBackend = $httpBackend;

            });
        });

        afterEach(function() {
            //httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        it('should have auth service defined', function () {
            expect(auth).toBeDefined();
        });

        it('should return token when valid user and password are provided', function () {
            var result = {};
            var returnData = valid_response;
            httpBackend.expectPOST('url/v1/auth/app-id/login').respond(returnData);

            var returnedPromise = auth.login('url', 'user', 'password');

            returnedPromise.then(function(response) {
                result = response;
            });

            httpBackend.flush();

            expect(result).toEqual('efc845e5-e02f-cd28-ece0-32ed00c23afd');
        });

        it('should return an error when in-valid user and password are provided', function () {
            var result = {};
            var returnData = invalid_response;
            httpBackend.expectPOST('url/v1/auth/app-id/login').respond(returnData);

            try {
                var returnedPromise = auth.login('url', 'bad-user', 'bad-password');
                returnedPromise.then(function (response) {
                    result = response;
                });

                httpBackend.flush();
            }
            catch(err) {
                expect(err.name).toBe('TypeError');
            }
        });
    });
});
describe('Auth', function () {

    var valid_response = '{"auth": { "client_token": "efc845e5-e02f-cd28-ece0-32ed00c23afd"} }';
    var invalid_response = '{"errors":["invalid user ID or app ID"]}';

    beforeEach(module('vaultPortal.auth'));

    describe('controller', function () {
        var $scope, ctrl, $q, defer, loginSpy,  tokenSpy;

        beforeEach(function () {

            inject(function ($rootScope, $controller, _$q_, auth) {
                $q = _$q_;
                $scope = $rootScope;

                defer = _$q_.defer();

                loginSpy = spyOn(auth, 'login').and.returnValue(defer.promise);
                tokenSpy = spyOn(auth, 'setToken');

                ctrl = $controller('loginController', {
                    $scope: $scope,
                    auth: auth
                });
            });

        });

        xit('should have login controller defined', function () {
            expect(ctrl).toBeDefined();
        });

        xit('should start with user and password not populated', function () {
            expect($scope.username).toEqual('');
            expect($scope.password).toEqual('');
        });

        it('should store token when valid user and password are provided', function () {
            defer.resolve("token");
            $scope.url = 'url';
            $scope.username = 'user';
            $scope.password = 'password';

            $scope.login();
            $scope.$apply();

            expect(loginSpy).toHaveBeenCalledWith('url', 'user', 'password');
            expect(tokenSpy).toHaveBeenCalledWith('token');
        });

        xit('should not store a token when in-valid user and password are provided', function () {
            defer.reject();
            $scope.url = 'url';
            $scope.username = 'bad-user';
            $scope.password = 'bad-password';

            $scope.login();
            $scope.$apply();

            expect(loginSpy).toHaveBeenCalledWith('url', 'bad-user', 'bad-password');
            expect(tokenSpy.calls.any()).toEqual(false);
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

        xit('should have auth service defined', function () {
            expect(auth).toBeDefined();
        });

        xit('should return token when valid user and password are provided', function () {
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

        xit('should return an error when in-valid user and password are provided', function () {
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
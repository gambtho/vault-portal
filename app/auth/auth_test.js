//http://www.benlesh.com/2013/05/angularjs-unit-testing-controllers.html
//http://www.bradoncode.com/blog/2015/07/13/unit-test-promises-angualrjs-q/


describe('Auth', function() {

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

        it('should start with user and password not populated', function () {
            expect($scope.username).toEqual('');
            expect($scope.password).toEqual('');
        });

        it('should store token when valid user and password are provided', function () {
            defer.resolve("blah");
            $scope.username = 'user';
            $scope.password = 'password';

            $scope.login();
            $scope.$apply();

            expect(spy).toHaveBeenCalledWith('user', 'password');
            expect($scope.token).toEqual('blah');
        });

        it('should not store a token when in-valid user and password are provided', function () {
            defer.reject();
            $scope.username = 'bad-user';
            $scope.password = 'bad-password';

            $scope.login();
            $scope.$apply();

            expect(spy).toHaveBeenCalledWith('bad-user', 'bad-password');
            expect($scope.token).toEqual('');
        });
    });

    describe('service', function() {
        beforeEach(function () {

        });

        it('should return token when valid user and password are provided', function () {

        });

        it('should return an error when in-valid user and password are provided', function () {

        });
    });
});
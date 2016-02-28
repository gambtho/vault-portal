describe('Auth Test', function() {
    var $scope, ctrl, $timeout;

    var authServiceMock;

    beforeEach(function (){

        authServiceMock = jasmine.createSpyObj('auth', ['login']);
        module('vaultPortal.auth');

        // $rootScopde - injected to create a new $scope instance.
        // $controller - injected to create an instance of our controller.
        // $q - injected so we can create promises for our mocks.
        // _$timeout_ - injected to we can flush unresolved promises.
        inject(function($rootScope, $controller, $q, _$timeout_) {
            $scope = $rootScope.$new();

            // set up the returns for our someServiceMock
            // $q.when('weee') creates a resolved promise to "weee".
            // this is important since our service is async and returns
            // a promise.
            authServiceMock.login.and.returnValue($q.when('weee'));

            // assign $timeout to a scoped variable so we can use
            // $timeout.flush() later. Notice the _underscore_ trick
            // so we can keep our names clean in the tests.
            $timeout = _$timeout_;

            // now run that scope through the controller function,
            // injecting any services or other injectables we need.
            // **NOTE**: this is the only time the controller function
            // will be run, so anything that occurs inside of that
            // will already be done before the first spec.
            ctrl = $controller('loginController', {
                $scope: $scope,
                auth: authServiceMock
            });
        });
    });

    /* Test 1: The simplest of the simple.
     * here we're going to test that some things were
     * populated when the controller function whas evaluated. */
    it('should start with user and pass not populated', function() {
        //just assert. $scope was set up in beforeEach() (above)
        expect($scope.username).toEqual('');
        expect($scope.password).toEqual('');
    });


    /* Test 2: Still simple.
     * Now let's test a simple function call. */
    xit('should add !!! to foo when test1() is called', function (){
        //set up.
        $scope.foo = 'x';

        //make the call.
        $scope.test1();

        //assert
        expect($scope.foo).toEqual('x!!!');
    });


    /* Test 3: Testing a $watch()
     * The important thing here is to call $apply()
     * and THEN test the value it's supposed to update. */
    xit('should update baz when bar is changed', function (){
        //change bar
        $scope.bar = 'test';

        //$apply the change to trigger the $watch.
        $scope.$apply();

        //assert
        expect($scope.baz).toEqual('testbaz');
    });


    /* Test 4: Testing an asynchronous service call.
     Since we've mocked the service to return a promise
     (just like the original service did), we need to do a little
     trick with $timeout.flush() here to resolve our promise so the
     `then()` clause in our controller function fires. 

     This will test to see if the `then()` from the promise is wired up
     properly. */
    xit('should update fizz asynchronously when test2() is called', function (){
        // just make the call
        $scope.test2();

        // asser that it called the service method.
        expect(authServiceMock.login).toHaveBeenCalled();

        // call $timeout.flush() to flush the unresolved dependency from our
        // someServiceMock.
        $timeout.flush();

        // assert that it set $scope.fizz
        expect($scope.fizz).toEqual('weee');
    });
});
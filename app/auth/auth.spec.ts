///<reference path="../../node_modules/angular2/typings/browser.d.ts"/>

import {AuthFactory} from './auth.factory';

import {
    Http,
    ConnectionBackend,
    BaseRequestOptions,
    ResponseOptions,
    Response
} from 'angular2/http';

import {MockBackend} from 'angular2/http/testing';

import {it, describe, expect, beforeEach, inject} from 'angular2/testing';

import {Injector, provide} from 'angular2/core';
import {Observable, Subject} from 'rxjs';

import {Auth} from './auth'

import {Router, RouteParams} from 'angular2/router';


describe('AuthFactory', () => {
    'use strict';



    var service;
    var injector;
    var backend;

    beforeEach(() => {
        injector = Injector.resolveAndCreate([
            BaseRequestOptions,
            MockBackend,
            provide(
                Http,
                {
                    useFactory: function (backend:ConnectionBackend, defaultOptions:BaseRequestOptions) {
                        return new Http(backend, defaultOptions);
                    },
                    deps: [MockBackend, BaseRequestOptions]
                }),
            provide(
                AuthFactory,
                {
                    useFactory: function (http: Http) {
                        return new AuthFactory(http);
                    },
                    deps: [Http]
                }
            )
        ]);
        service = injector.get(AuthFactory);

        backend = injector.get(MockBackend);
    });

    afterEach(() => backend.verifyNoPendingRequests());

    describe('login()', () => {
        describe('success', () => {
            it('should return a result from the promise', () => {
                var response;
                var valid_response = {"auth": { "client_token": "57eb939f-aa2d-7bf4-ba91-5cc9a7b3d0ca"}}
                var valid_request = `{ "app_id": "user","user_id":"password"}`;
                
                backend.connections.subscribe(c => {
                    expect(c.request.url).toEqual('http://tg23qo-prod.apigee.net/v1/v1/auth/app-id/login');
                    expect(c.request._body).toEqual(valid_request);
                    c.mockRespond(new Response(new ResponseOptions({body: valid_response})));
                });
                
                service.login('user', 'password').subscribe(data => response = data);

                expect(response).toEqual('57eb939f-aa2d-7bf4-ba91-5cc9a7b3d0ca');
            });
        });
    });
});


// describe('Auth', () => {
//
//     var valid_response = '{"auth": { "client_token": "efc845e5-e02f-cd28-ece0-32ed00c23afd"} }';
//     var invalid_response = '{"errors":["invalid user ID or app ID"]}';
//
//     beforeEach(() => {
//
//         // store = new Store(storeData, auth, router);
//     });
//     //beforeEach(module('vaultPortal.auth'));
//
//     describe('controller', () => {
//         var $scope, ctrl, $q, defer, loginSpy,  tokenSpy;
//
//         beforeEach(function () {
//
//             //inject(function ($rootScope, $controller, _$q_, auth) {
//             //    $q = _$q_;
//             //    $scope = $rootScope;
//             //
//             //    defer = _$q_.defer();
//             //
//             //    loginSpy = spyOn(auth, 'login').and.returnValue(defer.promise);
//             //    tokenSpy = spyOn(auth, 'setToken');
//             //
//             //    ctrl = $controller('loginController', {
//             //        $scope: $scope,
//             //        auth: auth
//             //    });
//             });
//
//         });
//
//
//
//         xit('should start with user and password not populated', function () {
//             //expect($scope.username).toEqual('');
//             //expect($scope.password).toEqual('');
//         });
//
//         it('should store token when valid user and password are provided', function () {
//             //defer.resolve("token");
//             //$scope.url = 'url';
//             //$scope.username = 'user';
//             //$scope.password = 'password';
//             //
//             //$scope.login();
//             //$scope.$apply();
//             //
//             //expect(loginSpy).toHaveBeenCalledWith('url', 'user', 'password');
//             //expect(tokenSpy).toHaveBeenCalledWith('token');
//         });
//
//         xit('should not store a token when in-valid user and password are provided', function () {
//             //defer.reject();
//             //$scope.url = 'url';
//             //$scope.username = 'bad-user';
//             //$scope.password = 'bad-password';
//             //
//             //$scope.login();
//             //$scope.$apply();
//             //
//             //expect(loginSpy).toHaveBeenCalledWith('url', 'bad-user', 'bad-password');
//             //expect(tokenSpy.calls.any()).toEqual(false);
//         });
//     });
//
//     describe('service', function() {
//         var httpBackend, auth;
//
//         var invalid_response = '{"errors":["invalid user ID or app ID"]}';
//
//         beforeEach(function () {
//
//             //inject(function ($httpBackend, _auth_) {
//             //    auth = _auth_;
//             //    httpBackend = $httpBackend;
//             //
//             //});
//         });
//
//         afterEach(function () {
//             //httpBackend.verifyNoOutstandingExpectation();
//             httpBackend.verifyNoOutstandingRequest();
//         });
//
//         xit('should have auth service defined', function () {
//             expect(auth).toBeDefined();
//         });
//
//         xit('should return token when valid user and password are provided', function () {
//             //var result = {};
//             //var returnData = valid_response;
//             //httpBackend.expectPOST('url/v1/auth/app-id/login').respond(returnData);
//             //
//             //var returnedPromise = auth.login('url', 'user', 'password');
//             //
//             //returnedPromise.then(function(response) {
//             //    result = response;
//             //});
//             //
//             //httpBackend.flush();
//             //
//             //expect(result).toEqual('efc845e5-e02f-cd28-ece0-32ed00c23afd');
//         });
//
//         xit('should return an error when in-valid user and password are provided', function () {
//             var result = {};
//             var returnData = invalid_response;
//             httpBackend.expectPOST('url/v1/auth/app-id/login').respond(returnData);
//
//             try {
//                 var returnedPromise = auth.login('url', 'bad-user', 'bad-password');
//                 returnedPromise.then(function (response) {
//                     result = response;
//                 });
//
//                 httpBackend.flush();
//             }
//             catch (err) {
//                 expect(err.name).toBe('TypeError');
//             }
//         });
//     });

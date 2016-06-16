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

import {it, describe, expect, beforeEach} from 'angular2/testing';

import {ReflectiveInjector, provide} from 'angular2/core';


describe('AuthFactory', () => {
    'use strict';
    
    var service;
    var injector;
    var backend;

    beforeEach(() => {
        injector = ReflectiveInjector.resolveAndCreate([
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
                var response = "invalid";
                var valid_response = {"auth": { "client_token": "57eb939f-aa2d-7bf4-ba91-5cc9a7b3d0ca"}};
                var valid_request = `{ "app_id": "user","user_id":"password"}`;
                
                backend.connections.subscribe(c => {
                    expect(c.request.url).toEqual('/v1/auth/app-id/login');
                    expect(c.request._body).toEqual(valid_request);
                    c.mockRespond(new Response(new ResponseOptions({body: valid_response})));
                });
                
                service.login('user', 'password').subscribe(data => response = data);

                expect(response).toEqual('57eb939f-aa2d-7bf4-ba91-5cc9a7b3d0ca');
            });
        });
    });
});

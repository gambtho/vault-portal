"use strict";
//http://jbavari.github.io/blog/2014/06/11/unit-testing-angularjs-services/

angular.module('myApp.authentication.service', ['ngRoute'])
    .factory('Auth', function Auth($http, $q) {
        var user = null;

        var readStoredUser = function readStoredUser() {
            //Try to read in from localStorage if one exists
            var storedUser = window.localStorage.getItem('user');
            try {
                if(storedUser) {
                    // Note: Using a simple user model here
                    user = new User(JSON.parse(storedUser));
                }
            } catch (ex) { /* Silently fail..*/ }
        }

        readStoredUser();

        var currentUser = function currentUser() {
            if(!user) {
                readStoredUser();
            }
            return user;
        }

        //TODO: this isn't real yet
        var logout = function logout() {
            user = null;
        }

        //TODO: this isn't real yet
        var checkUser = function checkUser() {
            return true;
        }

        var saveUser = function saveUser(userToSave) {
            window.localStorage.setItem('user', JSON.stringify(userToSave));
            user = userToSave;
        }

        var loginWithEmail = function loginWithEmail(name, email) {
            var deferred = $q.defer();

            var postPath = 'http://someurl.dev/api/v1/login';
            var postData = { name: name, email: email };

            $http.post(postPath, postData).success(function(data) {
                if(data.success) {
                    deferred.resolve(data);
                } else {
                    deferred.reject(data);
                }
            }).error(function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        return {
            currentUser: currentUser,
            loginWithEmail: loginWithEmail,
            saveUser: saveUser,
            logout: logout,
            checkUser: checkUser
        };
    });
    //
    //
    //.factory('AuthService', function ($http, Session) {
    //    var authService = {};
    //
    //    authService.login = function (credentials) {
    //        return $http
    //            .post('/login', credentials)
    //            .then(function (res) {
    //                Session.create(res.id, res.user.id, res.user.role);
    //                return res.user;
    //            });
    //    };
    //
    //    authService.isAuthenticated = function () {
    //        return !!Session.userId;
    //    };
    //
    //    authService.isAuthorized = function (authorizedRoles) {
    //        if (!angular.isArray(authorizedRoles)) {
    //            authorizedRoles = [authorizedRoles];
    //        }
    //        return (authService.isAuthenticated() &&
    //        authorizedRoles.indexOf(Session.userRole) !== -1);
    //    };
    //
    //    return authService;
    //})
(function (window, angular) {
    "use strict";

    angular.module('firebaseAuth', ['ngRoute', 'firebase', 'ngResource'])

        .constant('FBURL', 'https://webapi.firebaseio.com/')

        .constant('APIURL', 'http://localhost:56535/api/')
        
        .constant('USER_API', 'http://localhost:56535/api/users/')

        .constant('CITY_API', 'http://localhost:56535/api/cities/')

        .factory('authInterceptor', function ($rootScope, $q, $window) {
            return {
                request: function (config) {
                    config.headers = config.headers || {};
                    if ($window.sessionStorage.firebaseAuthToken) {
                        config.headers.Authorization = $window.sessionStorage.firebaseAuthToken;
                    }
                    return config;
                },
                response: function (response) {
                    if (response.status === 401) {
                        // TODO: User is not authed
                    }
                    return response || $q.when(response);
                }
            };
        })

        .config(function ($routeProvider, $httpProvider) {

            $routeProvider
                .when('/', {
                    controller: 'MainCtrl',
                    templateUrl: 'app/views/main.html'
                })
                .otherwise('/');
            
            $httpProvider.interceptors.push('authInterceptor');

            $httpProvider.responseInterceptors.push(function ($q) {
                return function (promise) {
                    var deferred = $q.defer();
                    promise.then(
                        function (response) {

                            //deferred.reject("");
                            
                            deferred.resolve(response);
                        },
                        function (error) {
                            deferred.reject(error);
                        }
                    );
                    return deferred.promise;
                };
            });

        });

})(window, angular);
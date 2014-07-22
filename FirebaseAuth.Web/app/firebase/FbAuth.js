(function (angular) {
    "use strict";

    // Auth factory that encapsulates $firebaseSimpleLogin methods
    // provides easy use of capturing events that were emitted
    // on the $rootScope when users login and out
    var app = angular.module('firebaseAuth');
    app.factory('FbAuth', function ($firebaseSimpleLogin, Fb, $rootScope, $window) {
        var simpleLogin = $firebaseSimpleLogin(Fb);
        return {
            getCurrentUser: function() {
                return simpleLogin.$getCurrentUser();
            },
            login: function (provider, user) {
                if (provider !== 'password') {
                    return simpleLogin.$login(provider);
                } else {
                    return simpleLogin.$login('password', {
                        email: user.email,
                        password: user.password
                    });
                }
            },
            logout: function() {
                return simpleLogin.$logout();
            },
            onLogin: function(cb) {
                $rootScope.$on('$firebaseSimpleLogin:login',
                  function (e, user) {

                      // add a cookie for the auth token
                      if (user && $window.sessionStorage.firebaseAuthToken !== user.firebaseAuthToken) {
                          $window.sessionStorage.firebaseAuthToken = user.firebaseAuthToken;
                      }

                      cb(e, user);
                  });
            },
            onLogout: function(cb) {
                $rootScope.$on('$firebaseSimpleLogin:logout',
                  function (e, user) {

                      // remove the authToken cookie
                      delete $window.sessionStorage.firebaseAuthToken;

                      cb(e, user);
                  });
            }
        }
    });

})(angular);
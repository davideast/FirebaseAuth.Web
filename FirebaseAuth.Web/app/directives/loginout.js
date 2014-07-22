(function () {
    "use strict";

    var app = angular.module('firebaseAuth');

    app.directive('loginout', function (FbAuth) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                provider: "@",
                inClass: '@',
                inTitle: '@',
                outClass: '@',
                outTitle: '@'
            },
            template: '<button ng-click="click()" class="{{cssClass}}"> {{ title }} </button>',
            link: function (scope, elem, attrs) {

                var configOut = {
                    click: function () {
                        FbAuth.logout();
                    },
                    cssClass: scope.outClass || 'btn btn-primary',
                    title: scope.outTitle || 'Logout'
                },
                configIn = {
                    click: function () {
                        FbAuth.login(scope.provider);
                    },
                    cssClass: scope.inClass || 'btn btn-success',
                    title: scope.inTitle || 'Login'
                };

                FbAuth.getCurrentUser()
                    .then(function (user) {
                        var config;
                        if (!user) {
                            // no user, time to login
                            config = configIn;
                        } else {
                            // logged in? prompt to logout
                            config = configOut;
                        }
                        
                        angular.extend(scope, config);

                    });

                FbAuth.onLogin(function (e, user) {
                    angular.extend(scope, configOut);
                });

                FbAuth.onLogout(function (e, user) {
                    angular.extend(scope, configIn);
                });

            }
        };
    });

})();
(function (angular) {
    "use strict";

    var app = angular.module('firebaseAuth');
    app.factory('Users', function ($resource, USER_API, $http) {
        var $users = $resource(USER_API + ':id', { id: '@id' });
        return {
            save: function saveUser(fbUser) {
                return $users.save(fbUser);
            },
            get: function getUser(id) {
                return $users.get({ id: id });
            }
        };
    });

})(angular);
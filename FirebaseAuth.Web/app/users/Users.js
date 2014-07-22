(function (angular) {
    "use strict";

    var app = angular.module('firebaseAuth');
    app.factory('Users', function ($resource, APIURL) {
        var $users = $resource(APIURL + 'users');
        return {
            save: function saveUser(fbUser) {
                return $users.save(fbUser);
                //$http.post(APIURL + 'users', fbUser)
                //    .success(function (e) {
                //        console.log(e);
                //    });
            }
        };
    });

})(angular);
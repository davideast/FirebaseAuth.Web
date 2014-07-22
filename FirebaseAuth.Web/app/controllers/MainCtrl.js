(function (angular) {

    angular.module('firebaseAuth')
        .controller('MainCtrl', function ($scope, FbAuth, Users, Cities) {

            FbAuth.onLogin(function (e, user) {
                var result = Users.save(user);
 
                Cities.get()
                .then(function (cities) {
                    console.log(cities);
                });
            });

            FbAuth.onLogout(function (e, user) {
                //console.log(e, user);
            });

        });

})(angular);
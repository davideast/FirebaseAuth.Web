(function (angular) {

    angular.module('firebaseAuth')
        .controller('MainCtrl', function ($scope, FbAuth, Users, Cities) {

            FbAuth.onLogin(function (e, user) {
                Users.save(user).$promise.then(function (user) {
                    console.log('loading', user);
                    Users.get(user.id);
                    var result = Cities.get();
                    console.log('cities', result);
                });
                
            });

            FbAuth.onLogout(function (e, user) {
                //console.log(e, user);
            });

        });

})(angular);
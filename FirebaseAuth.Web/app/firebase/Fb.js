(function (angular) {
    "use strict";

    angular.module('firebaseAuth')
        .service('Fb', ['FBURL', Firebase]);
    
})(angular);
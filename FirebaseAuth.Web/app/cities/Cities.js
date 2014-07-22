(function (angular) {
    "use strict";

    var app = angular.module('firebaseAuth');
    app.factory('Cities', function (CITY_API, $resource) {
        var $cities = $resource(CITY_API + ':id', { id: '@id' }, { 'all': { method: 'GET', isArray: true } });
        return {
            get: function getCities(id) {
                if (id) {
                    return $cities.get({ id: id });
                }
                return $cities.all();
            }
        };
    });

})(angular);
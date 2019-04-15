(function () {
    'use strict';
    angular.module('mwa').factory('UserFactory', UserFactory);

    UserFactory.$inject = ['$http', 'SETTINGS'];

    function UserFactory($http, SETTINGS) {
        return {
            list: list
        };

        function list() {
            return $http.get(SETTINGS.SERVICE_URL + 'api/users');
        }
    }
})();
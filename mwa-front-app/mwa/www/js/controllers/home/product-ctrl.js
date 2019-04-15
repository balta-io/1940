(function() {
    'use strict';
    angular.module('mwa').controller('ProductCtrl', ProductCtrl);

    ProductCtrl.$inject = ['$scope', '$http'];

    function ProductCtrl($scope, $http) {
        $scope.products = [];

        activate();

        function activate() {
            getProducts();
        }

        function getProducts() {
            $http.get('http://localhost:3000/api/products')
                .success(success)
                .catch(fail);

            function success(data) {
                $scope.products = data;
            }

            function fail(error) {
                console.log(error);
            }
        }
    }
})();

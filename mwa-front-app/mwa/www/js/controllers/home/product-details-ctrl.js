(function() {
    'use strict';
    angular.module('mwa').controller('ProductDetailsCtrl', ProductDetailsCtrl);

    ProductDetailsCtrl.$inject = ['$scope', '$http', '$stateParams', 'toaster'];

    function ProductDetailsCtrl($scope, $http, $stateParams, toaster) {
        $scope.products = [];
        $scope.product = {};
        $scope.addToCart = addToCart;

        activate();

        function activate() {
            getProduct($stateParams.id);
        }

        function getProduct(id) {
            $http.get('http://localhost:3000/api/products/' + id)
                .success(success)
                .catch(fail);

            function success(data) {
                $scope.product = data;
            }

            function fail(error) {
                console.log(error);
            }
        }

        function addToCart() {
            console.log('Adicionado');
            toaster.pop('success', "title", "text");
        }
    }
})();

(function() {
    'use strict';

    angular.module('mwa', ['ionic', 'ngAnimate', 'toaster']).run(
        function($ionicPlatform) {
            $ionicPlatform.ready(function() {
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if (window.StatusBar) {
                    StatusBar.styleDefault();
                }
            });
        });

    angular.module('mwa').config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/')

        $stateProvider.state('home', {
            url: '/',
            templateUrl: 'pages/home/index.html',
            controller: 'HomeCtrl'
        });

        $stateProvider.state('cart', {
            url: '/cart',
            templateUrl: 'pages/home/cart.html',
            controller: 'HomeCtrl'
        });

        $stateProvider.state('products', {
            url: '/products',
            templateUrl: 'pages/home/products.html',
            controller: 'ProductCtrl'
        });

        $stateProvider.state('productDetails', {
            url: '/products/details/:id',
            templateUrl: 'pages/home/product-details.html',
            controller: 'ProductDetailsCtrl'
        });
    });
})();

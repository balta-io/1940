(function () {
    'use strict';
    angular.module('mwa').controller('HeadbarCtrl', HeadbarCtrl);

    HeadbarCtrl.$inject = ['$ionicSideMenuDelegate'];

    function HeadbarCtrl($ionicSideMenuDelegate) {
        var vm = this;
        vm.toggleSidebar = toggleSidebar;

        activate();

        function activate() {

        }

        function toggleSidebar(){
            $ionicSideMenuDelegate.toggleLeft();
        }
    };
})();

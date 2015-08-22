(function() {
    'use strict';

    angular
        .module('app.core')
        .controller('MainController', MainController);

    MainController.$inject = ['$rootScope', '$location'];

    /* @ngInject */
    function MainController($rootScope, $location) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
        }
    }
})();
(function() {
    'use strict';

    angular
        .module('app.auth')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = [];

    /* @ngInject */
    function RegisterController() {
        var vm = this;

        activate();

        ////////////////

        function activate() {
        }
    }
})();
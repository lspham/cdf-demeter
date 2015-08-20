(function() {
    'use strict';

    angular
        .module('app.auth')
        .controller('LogoutController', LogoutController);

    LogoutController.$inject = ['authService', '$state'];

    /* @ngInject */
    function LogoutController(authService, $state) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            console.log('logout');
            authService.logOut();
            $state.go('login');
        }
    }
})();
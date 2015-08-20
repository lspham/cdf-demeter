(function() {
    'use strict';

    angular
        .module('app.auth')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['authService', '$state'];

    /* @ngInject */
    function LoginController(authService, $state) {
        var vm = this;
        vm.login = login;

        activate();

        ////////////////

        function activate () {
        }

        function login () {
            var userInfo = authService.auth(vm.email, vm.password);
            console.log('login', vm.isError);
            if (userInfo) {
                $state.go('projects');
            }

            vm.isError = !userInfo;
        }
    }
})();
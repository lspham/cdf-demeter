(function() {
    'use strict';

    angular
        .module('app.auth')
        .service('authService', authService);

    authService.$inject = ['localStorageService'];

    /* @ngInject */
    function authService(localStorageService) {
        var service = {
            auth: auth,
            logOut: logOut,
            getUser: getUser
        };

        return service;

        ////////////////

        function auth (email, password) {
            if (email == 'demeter.vn@gmail.com' && password == 'demeter.vn') {
                localStorageService.set('demeter_user', angular.toJson({
                    expired: +new Date() + 86400000,//86400000
                    username: 'admin',
                    name: 'admin'
                }));
                return true;
            }

            return false;
        }

        function logOut () {
            localStorageService.set('demeter_user', null);
        }

        function getUser () {
            var userInfo = localStorageService.get('demeter_user');
            userInfo = angular.fromJson(userInfo);

            if (!userInfo) {
                return false;
            }

            if (userInfo.expired < (+ new Date())) {
                localStorageService.set('demeter_user', null);
                return false;
            }

            return userInfo;
        }
    }
})();
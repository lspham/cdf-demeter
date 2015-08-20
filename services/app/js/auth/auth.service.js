(function() {
    'use strict';

    angular
        .module('app.auth')
        .service('authService', authService);

    authService.$inject = ['$window'];

    /* @ngInject */
    function authService($window) {
        var service = {
            auth: auth,
            logOut: logOut,
            getUser: getUser
        };

        return service;

        ////////////////

        function auth (email, password) {
            if (email == 'demeter.vn@gmail.com' && password == 'demeter.vn') {
                $window.localStorage.setItem('demeter_user', angular.toJson({
                    expired: +new Date() + 86400000,//86400000
                    username: 'admin',
                    name: 'Vinh Le'
                }));
                return true;
            }

            return false;
        }

        function logOut () {
            $window.localStorage.setItem('demeter_user', null);
        }

        function getUser () {
            var userInfo = $window.localStorage.getItem('demeter_user');
            userInfo = angular.fromJson(userInfo);

            if (!userInfo) {
                return false;
            }

            if (userInfo.expired < (+ new Date())) {
                $window.localStorage.setItem('demeter_user', null);
                return false;
            }

            return userInfo;
        }
    }
})();
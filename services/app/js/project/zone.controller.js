(function() {
    'use strict';

    angular
        .module('app.project')
        .controller('ZoneController', ZoneController);

    ZoneController.$inject = ['$rootScope', '$stateParams', 'modelService'];

    /* @ngInject */
    function ZoneController($rootScope, $stateParams, modelService) {
        var vm = this;
        $rootScope.pageTitle = 'Chi tiết Zone';

        activate();

        ////////////////

        function activate() {
            vm.data = [];
            modelService.getZoneDetail($stateParams['projectId'], $stateParams['id'], function (results) {
                vm.data.zone = results;
                $rootScope.pageTitle = results.name;
            });
            modelService.getProjectDetail($stateParams['projectId'], function (results) {
                vm.data.project = results;
            });
        }
    }
})();
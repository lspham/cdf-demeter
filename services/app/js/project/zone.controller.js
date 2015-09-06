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

        vm.getProjectsFinances = getProjectsFinances;

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

            modelService.getProjectFullStats($stateParams['projectId'], function (results) {
                vm.data.stats = results;
            });

            modelService.getProjectImages($stateParams['projectId'], function (results) {
                vm.data.images = results;
            });

            modelService.getProjectVideos($stateParams['projectId'], function (results) {
                vm.data.videos = results;
            });
        }

        function getProjectsFinances () {
            modelService.getProjectFinances($stateParams['projectId'], function (results) {
                vm.data.finances = results;
                // vm.data.finances = [];
            });
        }

    }
})();
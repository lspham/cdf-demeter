(function() {
    'use strict';

    angular
        .module('app.project')
        .controller('ProjectController', ProjectController);

    ProjectController.$inject = ['$rootScope', '$stateParams', 'modelService'];

    /* @ngInject */
    function ProjectController($rootScope, $stateParams, modelService) {
        var vm = this;
        $rootScope.pageTitle = 'Chi tiết dự án';

        activate();

        ////////////////

        function activate() {
            vm.data = [];
            modelService.getProjectDetail($stateParams['projectId'], function (results) {
                vm.data.project = results;
                $rootScope.pageTitle = results.name;
            });
        }
    }
})();
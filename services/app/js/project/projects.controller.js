(function() {
    'use strict';

    angular
        .module('app.project')
        .controller('ProjectsController', ProjectsController);

    ProjectsController.$inject = ['$rootScope', 'modelService'];

    /* @ngInject */
    function ProjectsController($rootScope, modelService) {
        var vm = this;
        $rootScope.pageTitle = 'Danh sách dự án';

        activate();

        ////////////////

        function activate() {
            vm.data = [];

            var userId = 777;
            modelService.getProjects(userId, function (results) {
                vm.data.projects = results;
            });
        }
    }
})();
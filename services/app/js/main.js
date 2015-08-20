(function() {
    'use strict';

    angular
        .module('app', [
            'ui.router',
            'ncy-angular-breadcrumb',
            'chart.js',
            'slugifier',
            'app.auth',
            'app.core',
            'app.project'
        ])
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$breadcrumbProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $breadcrumbProvider) {
            $stateProvider
                .state('home', {
                    url: '/dashboard',
                    controller: 'DashboardController',
                    controllerAs: 'vm',
                    templateUrl: '/templates/dashboard.html',
                    ncyBreadcrumb: {
                        label: 'Dashboard'
                    }

                })
                .state('projects', {
                    url: '/projects',
                    controller: 'ProjectsController',
                    controllerAs: 'vm',
                    templateUrl: '/templates/projects.html',
                    ncyBreadcrumb: {
                        label: 'Danh sách dự án'
                    }
                })
                .state('project', {
                    url: '/project/:projectId/:name.html',
                    controller: 'ProjectController',
                    controllerAs: 'vm',
                    templateUrl: '/templates/project.html',
                    ncyBreadcrumb: {
                        label: '{{vm.data.project.name}}',
                        parent: 'projects'
                    }
                })
                .state('zone', {
                    url: '/project/:projectId/:projectName/zone/:id/:name.html',
                    controller: 'ZoneController',
                    controllerAs: 'vm',
                    templateUrl: '/templates/zone.html',
                    ncyBreadcrumb: {
                        label: '{{vm.data.zone.name}}',
                        parent: 'project'
                    }
                })
                .state('login', {
                    url: '/login',
                    controller: 'LoginController',
                    controllerAs: 'vm',
                    templateUrl: '/templates/login.html',
                })
                .state('logout', {
                    url: '/logout',
                    controller: 'LogoutController',
                    controllerAs: 'vm',
                    templateUrl: '/templates/logout.html',
                })
                .state('register', {
                    url: '/register',
                    controller: 'RegisterController',
                    controllerAs: 'vm',
                    templateUrl: '/templates/register.html',
                });

            $breadcrumbProvider.setOptions({
                templateUrl: 'templates/breadcrumb.html'
            });

            $urlRouterProvider.otherwise('/projects');

            // $locationProvider.html5Mode(true);
        }])
        .run(['$rootScope', 'authService', '$state', function ($rootScope, authService, $state) {
            console.log('run');
            $rootScope.$on('$stateChangeStart', function (event, state, params) {
                $rootScope.userInfo = authService.getUser();
                if (!$rootScope.userInfo && state.controller != 'LoginController'
                    && state.controller != 'LogoutController') {
                    event.preventDefault();
                    $state.go('login');
                } else if ($rootScope.userInfo && state.controller == 'LoginController') {
                    event.preventDefault();
                    $state.go('projects');
                }
            });
        }]);
})();



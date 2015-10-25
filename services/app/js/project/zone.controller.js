(function() {
    'use strict';

    angular
        .module('app.project')
        .controller('ZoneController', ZoneController);

    ZoneController.$inject = ['$rootScope', '$stateParams', 'modelService', 'socketService'];

    /* @ngInject */
    function ZoneController($rootScope, $stateParams, modelService, socketService) {
        var vm = this;
        $rootScope.pageTitle = 'Chi tiết Zone';

        vm.getProjectsFinances = getProjectsFinances;
        vm.sendCmd = sendCmd;

        activate();

        ////////////////

        function activate() {
            vm.data = [];
            modelService.getZoneDetail($stateParams['projectId'], $stateParams['id'], function (results) {
                vm.data.zone = results;
                // vm.data.zone.stats = {};
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

            socketService.subscribe(null, function (data) {
                // on init data
                console.log('initData', data);

                $rootScope.$apply(function () {
                    vm.data.zone.stats = modelService.getStats(0, data);
                    console.log('stats', vm.data.zone.stats);
                });
            }, function (data) {
                // on update data
                console.log('updateData', data);
                var tim = new Date(data['tim'] * 1000), // + 7 * 60 * 60 * 1000
                    min = tim.getMinutes(),
                    sec = tim.getSeconds(),
                    hour = tim.getHours();

                if (min < 10) {
                    min = '0' + min;
                }

                if (sec < 10) {
                    sec = '0' + sec;
                }

                if (hour < 10) {
                    hour = '0' + hour;
                }

                tim = hour + ':' + min + ':' + sec;
                vm.data.zone.stats.labels.shift();
                vm.data.zone.stats.labels.unshift(tim);

                for (var key in vm.data.zone.stats.data) {
                    if (typeof data[key] !== 'undefined') {
                        vm.data.zone.stats.data[key].shift();
                        vm.data.zone.stats.data[key].unshift(data[key]);
                    }
                }
                console.log(vm.data.zone.stats);
                $rootScope.$apply();
            });
        }

        function sendCmd(controller, value) {
            console.log('sendCmd', controller, value);
            socketService.cmd(null, '#' + controller + ',' + (value ? '1' : '0'));
        }

        function getProjectsFinances () {
            modelService.getProjectFinances($stateParams['projectId'], function (results) {
                vm.data.finances = results;
                // vm.data.finances = [];
            });
        }

    }
})();
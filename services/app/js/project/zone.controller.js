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

                var getData = JSON.parse(data);
                var tmp = getData.data;
                //console.log(data.field1);

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

                if (typeof data.relay !== 'undefined') {
        			var statuses = toBinary(data.relay);
        			console.log('update statuses', statuses);
        			for (var i = 1; i <= 4; i++) {
        				vm['controller' + i] = statuses[i - 1] == '1' ? true : false;
        				console.log('- controller ' + i + ' > ' + vm['controller' + i]);
        			}
                }

                vm.data.zone.stats.data.temp[0] = tmp.temp / 10;
                vm.data.zone.stats.data.humid[0] = tmp.humid / 10;
                vm.data.zone.stats.data.light[0] = tmp.light;
                vm.data.zone.stats.data.airpress[0] = tmp.airpress;

                $rootScope.$apply();
            }, function (data) {
        		console.log('onInitStatus', data);
        		if (!data.length) return false;
        		var data = JSON.parse(data[0].data);
                if (typeof data.relay !== 'undefined') {
                    var statuses = toBinary(data.relay);
                    console.log('update statuses', statuses);
                    for (var i = 1; i <= 4; i++) {
                        vm['controller' + i] = statuses[i - 1] == '1' ? true : false;
                        console.log('- controller ' + i + ' > ' + vm['controller' + i]);
                    }
                }
		      $rootScope.$apply();
	       }, function (data) {
                console.log('onOnline', data);
                vm.online = data;
                $rootScope.$apply();
           });
        }

    	function toBinary(intVal) {
    		var binVal = (intVal >>> 0).toString(2);
    		if (binVal.length == 1) {
    			binVal = '000' + binVal;
    		} else if (binVal.length == 2) {
    			binVal = '00' + binVal;
    		} else if (binVal.length == 3) {
    			binVal = '0' + binVal;
    		}
    		return binVal;
    	}

        function sendCmd(controller, value) {
            console.log('sendCmd', controller, value);
            console.log('zone', vm.data.zone.id);
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

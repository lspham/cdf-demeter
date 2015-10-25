(function() {
    'use strict';

    angular
        .module('app.core')
        .service('socketService', socketService);

        socketService.$inject = [];

        /* @ngInject */
        function socketService() {
            var service = {
                subscribe: subscribe,
                cmd: cmd
            },
            socket;

            init();

            return service;

            function init() {
                socket = io('http://localhost:6006');
            }

            function subscribe(deviceId, onInitData, onUpdateData) {
                if (!deviceId) {
                    deviceId = '862118025168888';
                }

                socket.emit('redisSub', {deviceId: deviceId});
                socket.on('initData', function (data) {
                    onInitData(data);
                });
                socket.on('data', function (data) {
                    onUpdateData(data);
                });
            }

            function cmd(deviceId, cmd) {
                if (!deviceId) {
                    deviceId = '862118025168888';
                }

                socket.emit('cmd', {
                    deviceId: deviceId,
                    data: cmd
                });
            }
        }
})();
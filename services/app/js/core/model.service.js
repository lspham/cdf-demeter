(function() {
    'use strict';

    angular
        .module('app.core')
        .service('modelService', modelService);

    modelService.$inject = [];

    /* @ngInject */
    function modelService() {
        var service = {
            getProjects: getProjects,
            getProjectDetail: getProjectDetail,
            getZoneDetail: getZoneDetail,
            getProjectFullStats: getProjectFullStats,
            getProjectImages: getProjectImages,
            getProjectVideos: getProjectVideos,
            getProjectFinances: getProjectFinances,
            getStats: getStats
        },
        projects,
        weathers;
        // stats;

        init();

        return service;

        ////////////////

        function init () {

        }

        function getLineOptions () {
            return {
                lineSmooth: false,
                fullWidth: true,
                chartPadding: {
                    top: 15,
                    right: 45,
                    bottom: 5,
                    left: 10
                },
            };
        }

        function getProject () {
            weathers = {
                active: 'temp',
                series: {
                    temp: ['Nhiệt độ'],
                    humid: ['Độ ẩm'],
                    precip: ['Lượng mưa'],
                    wind: ['Gió']
                },
                units: {
                    temp: '°C',
                    humid: '%',
                    precip: '%',
                    wind: 'km/h'
                },
                data: {
                    temp: [],
                    humid: [],
                    precip: [],
                    wind: [],
                },
                labels: [],
                // colours: {
                //     temp: ['#fbbd08'],
                //     humid: ['#00b5ad'],
                //     precip: ['#4a88cb'],
                //     wind: ['#767676']
                // },
                // colors: {
                //     temp: 'yellow',
                //     humid: 'teal',
                //     precip: 'blue',
                //     wind: 'grey'
                // },
                options: getLineOptions()
            };

            var stats = getStats(7);

            projects = {
                1: {
                    id: 1,
                    name: 'Cầu Đất Farm',
                    cover: 'data/images/bg-3.jpg',
                    addr: 'Cầu Đất, Lâm Đồng.',
                    staffs: 61,
                    zoneCount: 3,
                    area: 220,
                    zones: {
                        111: {
                            id: 111,
                            name: 'B1 - Lettuce',
                            cover: 'data/images/farm-rau.jpg',
                            staffs: 4,
                            notifications: 4,
                            progress: 40,
                            stats: stats
                        },
                        222: {
                            id: 222,
                            name: 'B2 - Strawberry',
                            cover: 'data/images/farm-dau.jpg',
                            staffs: 11,
                            notifications: 6,
                            progress: 18,
                            stats: stats,
                            end: new Date(2015, 9, 20),
                            start: new Date(2015, 8, 1)
                        },
                        333: {
                            id: 333,
                            name: 'B3 - Tomato & Cucumber',
                            cover: 'data/images/farm-tomato.jpg',
                            staffs: 11,
                            notifications: 6,
                            progress: 80,
                            stats: stats,
                            end: new Date(2015, 9, 15),
                            start: new Date(2015, 8, 10)
                        }
                    },
                    weathers: weathers
                },
                2: {
                    id: 2,
                    name: 'Demo Farm',
                    cover: 'data/images/demeter-farm.png',
                    addr: '',
                    staffs: 11,
                    zoneCount: 3,
                    area: 10,
                    zones: {
                        444: {
                            id: 444,
                            name: 'Demo Zone',
                            cover: 'data/images/demeter-farm.png',
                            staffs: 4,
                            notifications: 4,
                            progress: 10,
                            stats: stats,
                            end: new Date(2015, 9, 20),
                            start: new Date(2015, 8, 1)
                        }
                    },
                    weathers: weathers
                }
            };

            return projects;
        }

        function getProjects (userId, onSuccess) {
            var projects = getProject();
            return onSuccess(projects);
        }

        function calcProgress (data) {
            var today = new Date();

            for (var key in data.zones) {
                data.zones[key].progress = today > data.zones[key].end ? 100 : Math.floor((today - data.zones[key].start) * 100/ (data.zones[key].end - data.zones[key].start));
            }

            return data;
        }

        function getProjectDetail (projectId, onSuccess) {
            var projects = getProject(),
                data = projects[projectId];

            data = calcProgress(data);

            return onSuccess(data);
        }

        function getZoneDetail(projectId, zoneId, onSuccess) {
            var projects = getProject(),
                data = projects[projectId];

            var controls = getZoneControl(projectId, zoneId);

            data['zones'][zoneId].controls = controls;
            data = calcProgress(data);

            console.log(data);
            return onSuccess(data['zones'][zoneId]);
        }

        function getZoneControl(projectId, zoneId)
        {
            var controls = [];

            if (projectId == 1) {
                if (zoneId == 111) { // B1
                    controls = [
                        {
                            id: 0,
                            label: '',
                            device: 'Curtain 1 UP',
                            status: true
                        },
                        {
                            id: 1,
                            label: '',
                            device: 'Curtain 1 DOWN',
                            status: false
                        },
                        {
                            id: 2,
                            label: '',
                            device: 'Curtain 2 UP',
                            status: true
                        },
                        {
                            id: 3,
                            label: '',
                            device: 'Curtain 2 DOWN',
                            status: false
                        },
                        {
                            id: 4,
                            label: '',
                            device: 'Curtain 3 UP',
                            status: true
                        },
                        {
                            id: 5,
                            label: '',
                            device: 'Curtain 3 DOWN',
                            status: true
                        },
                        {
                            id: 6,
                            label: '',
                            device: 'Shade Curtain OPEN',
                            status: false
                        },
                        {
                            id: 7,
                            label: '',
                            device: 'Shade Curtain CLOSE',
                            status: false
                        },
                        {
                            id: 8,
                            label: '',
                            device: 'FAN',
                            status: false
                        }
                    ];
                }

                if (zoneId == 222) { // B2
                    controls = [
                        {
                            id: 0,
                            label: '',
                            device: 'FAN1',
                            status: true
                        },
                        {
                            id: 1,
                            label: '',
                            device: 'FAN2',
                            status: false
                        },
                        {
                            id: 2,
                            label: '',
                            device: 'FAN3',
                            status: true
                        },
                        {
                            id: 3,
                            label: '',
                            device: 'FAN4',
                            status: false
                        }
                    ];
                }

                if (zoneId == 333) { // B3
                    controls = [
                        {
                            id: 0,
                            label: '',
                            device: 'Curtain 111 UP',
                            status: true
                        },
                        {
                            id: 1,
                            label: '',
                            device: 'Curtain 1 DOWN',
                            status: false
                        },
                        {
                            id: 2,
                            label: '',
                            device: 'Curtain 2 UP',
                            status: true
                        },
                        {
                            id: 3,
                            label: '',
                            device: 'Curtain 2 DOWN',
                            status: false
                        },
                        {
                            id: 4,
                            label: '',
                            device: 'Curtain 3 UP',
                            status: true
                        },
                        {
                            id: 5,
                            label: '',
                            device: 'Curtain 3 DOWN',
                            status: true
                        },
                        {
                            id: 6,
                            label: '',
                            device: 'Shade Curtain OPEN',
                            status: false
                        },
                        {
                            id: 7,
                            label: '',
                            device: 'Shade Curtain CLOSE',
                            status: false
                        },
                        {
                            id: 8,
                            label: '',
                            device: 'FAN',
                            status: false
                        }
                    ];
                }
            }

            return controls;
        }

        function getProjectFullStats (projectId, onSuccess) {
            var stats = getStats(30);
            onSuccess(stats);
        }

        function getProjectImages (projectId, onSuccess) {
            var images = [
                {
                    image: '1.jpeg',
                    h: 2,
                    w: 2
                },
                {
                    image: '2.jpeg',
                    h: 3,
                    w: 3
                },
                {
                    image: '3.jpeg',
                    h: 3,
                    w: 4
                },
                {
                    image: '4.jpeg',
                    h: 5,
                    w: 6
                },
                {
                    image: '5.jpeg',
                    h: 6,
                    w: 6
                },
                {
                    image: '6.jpeg',
                    h: 7,
                    w: 8
                },
                {
                    image: '7.jpeg',
                    h: 8,
                    w: 9
                },
                {
                    image: '8.jpeg',
                    h: 10,
                    w: 10
                },
                {
                    image: '9.jpeg',
                    h: 12,
                    w: 12
                },
                {
                    image: '10.jpeg',
                    h: 12,
                    w: 13
                },
                {
                    image: '11.jpeg',
                    h: 14,
                    w: 14
                },
                {
                    image: '12.jpg',
                    h: 15,
                    w: 16
                },
                {
                    image: '13.jpeg',
                    h: 16,
                    w: 17
                },
                {
                    image: '14.jpeg',
                    h: 18,
                    w: 18
                },
                {
                    image: '15.jpeg',
                    h: 19,
                    w: 19
                },
                {
                    image: '16.jpeg',
                    h: 19,
                    w: 20
                },
                {
                    image: '17.jpeg',
                    h: 19,
                    w: 21
                },
                {
                    image: '18.jpeg',
                    h: 19,
                    w: 22
                },
                {
                    image: '19.jpeg',
                    h: 19,
                    w: 23
                },
                {
                    image: '20.jpeg',
                    h: 20,
                    w: 24
                },
                {
                    image: '21.jpeg',
                    h: 20,
                    w: 25
                },
                {
                    image: '22.jpeg',
                    h: 20,
                    w: 26
                },
                {
                    image: '23.jpeg',
                    h: 20,
                    w: 28
                },
                {
                    image: '24.jpeg',
                    h: 20,
                    w: 30
                }
            ];
            onSuccess(images);
        }

        function getProjectVideos(projectId, onSuccess) {
            var videos = [
                {
                    image: 'video-1.jpg'
                },
                {
                    image: 'video-2.jpg'
                }
            ];

            onSuccess(videos);
        }

        function getProjectFinances(projectId, onSuccess) {
            var finances = {
                labels: ["Giống", "Giá thể", "Nhân công", "Điện nước", "Phân"],
                data: [20, 20, 35, 15, 10],
                options: {

                }
            };

            onSuccess(finances);
        }

        function randomInt(value, dt) {
            var min = value - dt,
                max = value + dt;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function randomFloat(value, dt) {
            return randomInt(value * 10, dt * 10) / 10;
        }

        function getStats(dateCount, extendData) {
            console.log('getStats', dateCount);
            var stats = {
                active: 'temp',
                series: {
                    temp: ['Nhiệt độ'],
                    humid: ['Độ ẩm không khí'],
                    light: ['Ánh sáng'],
                    airpress: ['Áp suất'],
                    pH: ['pH'],
                    ec: ['EC']
                },
                units: {
                    temp: '°C',
                    humid: '%',
                    light: 'lux',
                    airpress: 'pa',
                    pH: '',
                    ec: ''
                },
                data: {
                    temp: [],
                    humid: [], // humidity - độ ẩm
                    light: [],
                    airpress: [],
                    pH: [],
                    ec: []
                },
                labels: [],
                // colours: {
                //     temp: ['#fbbd08'],
                //     humid: ['#00b5ad'],
                //     humid2: ['#00b5ad'],
                //     o2: ['#767676'],
                //     co2: ['#767676'],
                //     light: ['#db2828'],
                //     ph: ['#4a88cb'],
                //     ec: ['#a5673f'],
                //     vpd: ['#21ba45']
                // },
                // colors: {
                //     temp: 'yellow',
                //     humid: 'teal',
                //     humid2: 'teal',
                //     o2: 'grey',
                //     co2: 'grey',
                //     light: 'red',
                //     ph: 'blue',
                //     ec: 'brown',
                //     vpd: 'green',
                // },
                options: getLineOptions()
            };

            weathers.labels = [];
            stats.labels = [];
            for (var i = 0; i < dateCount; i++) {
                var date = new Date();
                date.setDate(date.getDate() + i);
                // weathers.labels.push(date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear());
                weathers.labels.push(date.getDate() + '/' + (date.getMonth() + 1));
                weathers.data.temp[i]   = randomInt(22, 5);
                weathers.data.humid[i]  = randomInt(75, 15);
                weathers.data.precip[i] = randomInt(60, 40);
                weathers.data.wind[i]   = randomInt(15, 10);

                date = new Date();
                date.setDate(date.getDate() - dateCount + i + 1);
                // stats.labels.push(date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear());
                stats.labels.push(date.getDate() + '/' + (date.getMonth() + 1));

                // data
                stats.data.temp[i]   = randomInt(22.1, 5);
                stats.data.humid[i]  = randomInt(75.4, 15);
                stats.data.light[i]  = randomInt(75, 15);
                stats.data.airpress[i]  = randomInt(83650, 200);
                stats.data.pH[i] = 6.0;
                stats.data.ec[i] = 1.5;
                // stats.data.humid2[i] = randomInt(65, 15);
                // stats.data.o2[i]     = randomInt(9, 3);
                // stats.data.co2[i]    = randomInt(380, 30);
                // stats.data.light[i]  = randomInt(475, 125);
                // stats.data.pH[i]     = randomFloat(6.2, 0.5);
                // stats.data.ec[i]     = randomFloat(1.1, 0.4);
                // stats.data.vpd[i]    = randomFloat(1.4, 0.3);
            }

            // if (dateCount == 0) {
            //     stats.data = extendData.data;
            //     stats.labels = extendData.labels;

            //     stats.data.humid2 = [];
            //     stats.data.vpd = [];
            //     for (var i = 0; i < 7; i++) {
            //         stats.data.humid2[i] = randomInt(65, 15);
            //         stats.data.vpd[i]    = randomFloat(1.4, 0.3);
            //     }
            // }

            return stats;
        }
    }
})();
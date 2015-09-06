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
            getProjectFinances: getProjectFinances
        },
        projects,
        weathers;
        // stats;

        init();

        return service;

        ////////////////

        function init () {

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
                    temp: [33, 28, 27, 27, 27, 26, 27, 31],
                    humid: [59, 62, 10, 7, 20, 36, 42, 51], // humidity - độ ẩm
                    precip: [89, 100, 24, 14, 19, 34, 44, 81], //precipitation - lượng mưa
                    wind: [13, 14, 10, 8, 6, 6, 11, 18]
                },
                labels: [],
                colours: {
                    temp: ['#fbbd08'],
                    humid: ['#00b5ad'],
                    precip: ['#4a88cb'],
                    wind: ['#767676']
                },
                colors: {
                    temp: 'yellow',
                    humid: 'teal',
                    precip: 'blue',
                    wind: 'grey'
                }
            };

            var stats = getStats(7);

            projects = {
                1: {
                    id: 1,
                    name: 'Cầu Đất Farm',
                    cover: 'data/images/bg-3.jpg',
                    addr: 'Cầu Đất, Lâm Đồng.',
                    staffs: 692,
                    zoneCount: 2,
                    area: 220,
                    zones: {
                        111: {
                            id: 111,
                            name: 'Nhà kính - Dâu',
                            cover: 'data/images/farm-dau.jpg',
                            staffs: 4,
                            notifications: 4,
                            progress: 40,
                            stats: stats
                        },
                        222: {
                            id: 222,
                            name: 'Đồi chè',
                            cover: 'data/images/bg-3.jpg',
                            staffs: 11,
                            notifications: 6,
                            progress: 18,
                            stats: stats
                        },
                        666: {
                            id: 222,
                            name: 'Farm rau',
                            cover: 'data/images/farm-rau.jpg',
                            staffs: 11,
                            notifications: 6,
                            progress: 80,
                            stats: stats
                        }
                    },
                    weathers: weathers
                },
                2: {
                    id: 2,
                    name: 'Demeter Farm',
                    cover: 'data/images/bg-1.jpg',
                    addr: 'Quận 1, Sài Gòn.',
                    staffs: 11,
                    zoneCount: 3,
                    area: 10,
                    zones: {
                        333: {
                            id: 333,
                            name: 'Nhà kính - Cà chua',
                            cover: 'data/images/thumb-3.jpg',
                            staffs: 4,
                            notifications: 4,
                            progress: 10,
                            stats: stats
                        },
                        444: {
                            id: 444,
                            name: 'Nhà kính - Xà lách',
                            cover: 'data/images/thumb-6.jpg',
                            staffs: 18,
                            notifications: 1,
                            progress: 96,
                            stats: stats
                        },
                        555: {
                            id: 555,
                            name: 'Hồ nuôi - Cá chép',
                            cover: 'data/images/thumb-4.jpg',
                            staffs: 91,
                            notifications: 2,
                            progress: 50,
                            stats: stats
                        },
                    },
                    weathers: weathers
                },
                3: {
                    id: 3,
                    name: 'Cà Mau Farm',
                    cover: 'data/images/thumb-3.jpg',
                    addr: 'Quận 1, Sài Gòn.',
                    staffs: 11,
                    zoneCount: 3,
                    area: 10,
                    zones: {
                        333: {
                            id: 333,
                            name: 'Nhà kính - Cà chua',
                            cover: 'data/images/thumb-3.jpg',
                            staffs: 4,
                            notifications: 4,
                            progress: 10,
                            stats: stats
                        }
                    },
                    weathers: weathers
                },
                4: {
                    id: 4,
                    name: 'Đồng Nai Farm',
                    cover: 'data/images/thumb-1.jpg',
                    addr: 'Quận 1, Sài Gòn.',
                    staffs: 11,
                    zoneCount: 3,
                    area: 10,
                    zones: {
                        333: {
                            id: 333,
                            name: 'Nhà kính - Cà chua',
                            cover: 'data/images/thumb-3.jpg',
                            staffs: 4,
                            notifications: 4,
                            progress: 10,
                            stats: stats
                        }
                    },
                    weathers: weathers
                },
                5: {
                    id: 5,
                    name: 'Đồng Tháp Farm',
                    cover: 'data/images/thumb-2.jpg',
                    addr: 'Quận 1, Sài Gòn.',
                    staffs: 11,
                    zoneCount: 3,
                    area: 10,
                    zones: {
                        333: {
                            id: 333,
                            name: 'Nhà kính - Cà chua',
                            cover: 'data/images/thumb-3.jpg',
                            staffs: 4,
                            notifications: 4,
                            progress: 10,
                            stats: stats
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

        function getProjectDetail (projectId, onSuccess) {
            var projects = getProject();
            return onSuccess(projects[projectId]);
        }

        function getZoneDetail(projectId, zoneId, onSuccess) {
            var projects = getProject();
            return onSuccess(projects[projectId]['zones'][zoneId]);
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

        function getStats(dateCount) {
            console.log('getStats', dateCount);
            var stats = {
                active: 'temp',
                series: {
                    temp: ['Nhiệt độ'],
                    humid: ['Độ ẩm không khí'],
                    humid2: ['Độ ẩm đất'],
                    o2: ['O2'],
                    co2: ['CO2'],
                    light: ['Ánh sáng'],
                    ph: ['pH'],
                    ec: ['EC'],
                    vpd: ['VPD']
                },
                units: {
                    temp: '°C',
                    humid: '%',
                    humid2: '%',
                    o2: 'ppm',
                    co2: 'ppm',
                    light: 'lux',
                    ph: '',
                    ec: '',
                    vpd: ''
                },
                data: {
                    temp: [],
                    humid: [], // humidity - độ ẩm
                    humid2: [], //precipitation - lượng mưa
                    o2: [],
                    co2: [],
                    light: [],
                    ph: [],
                    ec: [],
                    vpd: []
                },
                labels: [],
                colours: {
                    temp: ['#fbbd08'],
                    humid: ['#00b5ad'],
                    humid2: ['#00b5ad'],
                    o2: ['#767676'],
                    co2: ['#767676'],
                    light: ['#db2828'],
                    ph: ['#4a88cb'],
                    ec: ['#a5673f'],
                    vpd: ['#21ba45']
                },
                colors: {
                    temp: 'yellow',
                    humid: 'teal',
                    humid2: 'teal',
                    o2: 'grey',
                    co2: 'grey',
                    light: 'red',
                    ph: 'blue',
                    ec: 'brown',
                    vpd: 'green',
                },
                options: {
                    scaleBeginAtZero: true
                }
            };

            weathers.labels = [];
            stats.labels = [];
            for (var i = 0; i < dateCount; i++) {
                var date = new Date();
                date.setDate(date.getDate() + i);
                // weathers.labels.push(date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear());
                weathers.labels.push(date.getDate() + '/' + (date.getMonth() + 1));

                date = new Date();
                date.setDate(date.getDate() - dateCount + i + 1);
                // stats.labels.push(date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear());
                stats.labels.push(date.getDate() + '/' + (date.getMonth() + 1));

                // data
                stats.data.temp[i]   = randomInt(22, 5);
                stats.data.humid[i]  = randomInt(75, 15);
                stats.data.humid2[i] = randomInt(65, 15);
                stats.data.o2[i]     = randomInt(9, 3);
                stats.data.co2[i]    = randomInt(380, 30);
                stats.data.light[i]  = randomInt(475, 125);
                stats.data.ph[i]     = randomFloat(6.2, 0.5);
                stats.data.ec[i]     = randomFloat(1.1, 0.4);
                stats.data.vpd[i]    = randomFloat(1.4, 0.3);
            }

            return stats;
        }
    }
})();
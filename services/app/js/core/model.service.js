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
            getZoneDetail: getZoneDetail
        },
        projects,
        weathers,
        stats;

        init();

        return service;

        ////////////////

        function init () {
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
                options: {
                    bezierCurve: false
                },
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

            stats = {
                active: 'temp',
                series: {
                    temp: ['Nhiệt độ'],
                    humid: ['Độ ẩm không khí'],
                    humid2: ['Độ ẩm đất'],
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
                    co2: '%',
                    light: 'lumen',
                    ph: 'pH',
                    ec: 'EC',
                    vpd: 'VPD'
                },
                data: {
                    temp: [33, 28, 27, 27, 27, 26, 27, 24],
                    humid: [59, 62, 10, 7, 20, 36, 42, 51], // humidity - độ ẩm
                    humid2: [89, 100, 24, 14, 19, 34, 44, 81], //precipitation - lượng mưa
                    co2: [13, 14, 10, 8, 6, 6, 11, 18],
                    light: [10, 8, 2, 2, 4, 1, 8, 3],
                    ph: [7, 8, 9, 7, 9, 5, 12, 6],
                    ec: [3.1, 2.8, 3.7, 3.5, 2.5, 3.9, 3.8, 3.0],
                    vpd: [3.5, 3.6, 3.7, 3.4, 3.9, 2.9, 3.5, 3.5]
                },
                labels: [],
                options: {
                    bezierCurve: false
                },
                colours: {
                    temp: ['#fbbd08'],
                    humid: ['#00b5ad'],
                    humid2: ['#00b5ad'],
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
                    co2: 'grey',
                    light: 'red',
                    ph: 'blue',
                    ec: 'brown',
                    vpd: 'green',
                }
            };

            for (var i = 0; i < 8; i++) {
                var date = new Date();
                date.setDate(date.getDate() + i);
                weathers.labels.push(date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear());
                date.setDate(date.getDate() - 7);
                stats.labels.push(date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear());
            }

            projects = {
                1: {
                    id: 1,
                    name: 'Cầu Đất Farm',
                    cover: 'data/images/bg-3.jpg',
                    addr: 'Cầu Đất, Lâm Đồng.',
                    staffs: 692,
                    zoneCount: 2,
                    zones: {
                        111: {
                            id: 111,
                            name: 'Cánh đồng - Hoa',
                            cover: 'data/images/thumb-7.jpg',
                            staffs: 4,
                            notifications: 4,
                            progress: 40,
                            stats: stats
                        },
                        222: {
                            id: 222,
                            name: 'Khác - Ong',
                            cover: 'data/images/thumb-2.jpg',
                            staffs: 11,
                            notifications: 6,
                            progress: 18,
                            stats: stats
                        },
                        666: {
                            id: 222,
                            name: 'Vườn cây ăn quả - Cam',
                            cover: 'data/images/thumb-1.jpg',
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
                }
            };
        }

        function getProjects (userId, onSuccess) {
            return onSuccess(projects);
        }

        function getProjectDetail (projectId, onSuccess) {
            return onSuccess(projects[projectId]);
        }

        function getZoneDetail(projectId, zoneId, onSuccess) {
            return onSuccess(projects[projectId]['zones'][zoneId]);
        }
    }
})();
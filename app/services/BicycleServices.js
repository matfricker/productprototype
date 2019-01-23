(function () {
    'use strict';

    angular
        .module('app')
        .factory('BicycleServices', BicycleServices);

    BicycleServices.$inject = [];

    function BicycleServices() {

        return {
            GetLengthOfCoverOptions: getLengthOfCoverOptions,
            GetBicycleTypeOptions: getBicycleTypeOptions,
            GetHelmetAndClothingValueOptions: getHelmetAndClothingValueOptions,
            GetTypeOfCoverOptions: getTypeOfCoverOptions,
            GetClaimsOptions: getClaimsOptions
        };
    }

    function getLengthOfCoverOptions() {
        return [
            { id: 365, value: 'Annual' },
            { id: 5, value: '5 Days' },
            { id: 10, value: '10 Days' },
            { id: 17, value: '17 Days' },
            { id: 31, value: '31 Days' }
        ];
    }

    function getBicycleTypeOptions() {
        return [
            { id: 1, value: 'BMX' },
            { id: 2, value: 'Cruiser' },
            { id: 3, value: 'Cyclo-Cross' },
            { id: 4, value: 'Dutch / Shopping' },
            { id: 5, value: 'Electric' },
            { id: 6, value: 'Fat' },
            { id: 7, value: 'Fixed Gear' },
            { id: 8, value: 'Folding' },
            { id: 9, value: 'Hand' },
            { id: 10, value: 'Hybrid / Flat Bar / Commuter' },
            { id: 11, value: 'Mountain' },
            { id: 12, value: 'Recumbent' },
            { id: 13, value: 'Road / Racing' },
            { id: 14, value: 'Tandem' },
            { id: 15, value: 'Time Trial / Triathlon' },
            { id: 16, value: 'Touring' },
            { id: 17, value: 'Track' },
            { id: 18, value: 'Cargo / E-cargo' }
        ];
    }

    function getHelmetAndClothingValueOptions() {
        return [
            { id: 0, value: 0 },
            { id: 250, value: 250 },
            { id: 500, value: 500 },
            { id: 1000, value: 1000 },
            { id: 1500, value: 1500 },
            { id: 2000, value: 2000 }
        ];
    }

    function getTypeOfCoverOptions() {
        return [
            { id: 1, value: 'Essential' },
            { id: 2, value: 'Performance' },
            { id: 3, value: 'Ultimate' }
        ];
    }

    function getClaimsOptions() {
        return [
            { id: 0, value: 'None' },
            { id: 1, value: '1' },
            { id: 2, value: '2' },
            { id: 3, value: '3+' }
        ];
    }

})();
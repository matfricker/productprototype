(function() {
    'use strict';

    angular
        .module('app')
        .controller('BicycleController', ['$scope', '$log', 'GenericServices', function($scope, $log, GenericServices) {

            $scope.Title = "Product";

            $scope.Basket = {};
            $scope.Basket.BicycleQuotes = [{
                Bicycles: []
            }];

            // POPULATE LENGTH OF COVER DROPDOWN
            $scope.LengthOfCoverOptions = [{
                    Id: "365",
                    Name: "Annual",
                    Value: 365
                },
                {
                    Id: "5",
                    Name: "5 Days",
                    Value: 5
                },
                {
                    Id: "10",
                    Name: "10 Days",
                    Value: 10
                },
                {
                    Id: "17",
                    Name: "17 Days",
                    Value: 17
                },
                {
                    Id: "31",
                    Name: "31 Days",
                    Value: 31
                }
            ];

            $scope.BicycleTypeOptions = [
                { id: 1, value: "BMX" },
                { id: 2, value: "Cruiser" },
                { id: 3, value: "Cyclo-Cross" },
                { id: 4, value: "Dutch / Shopping" },
                { id: 5, value: "Electric" },
                { id: 6, value: "Fat" },
                { id: 7, value: "Fixed Gear" },
                { id: 8, value: "Folding" },
                { id: 9, value: "Hand" },
                { id: 10, value: "Hybrid / Flat Bar / Commuter" },
                { id: 11, value: "Mountain" },
                { id: 12, value: "Recumbent" },
                { id: 13, value: "Road / Racing" },
                { id: 14, value: "Tandem" },
                { id: 15, value: "Time Trial / Triathlon" },
                { id: 16, value: "Touring" },
                { id: 17, value: "Track" }
            ];

            $scope.ShowAddBicycle = true;
            // ADD BICYCLE INTO GRID
            $scope.AddBicycle = function() {
                $scope.Basket.BicycleQuotes[0].Bicycles.push({
                    TempId: Date.now(),
                    MakeModel: $scope.Bicycle.MakeModel,
                    Value: $scope.Bicycle.Value,
                    Type: $scope.Bicycle.Type,
                    TypeName: GenericServices.GetBicycleType($scope.Bicycle.Type)
                });

                $log.debug('Bicycle Added');

                // CLEAR FORM VALUES
                $scope.Bicycle = {};
            };

            // POPULATE HELMET AND CLOTHING DROPDOWN
            $scope.HelmetAndClothingValueOptions = [{
                    Id: "0",
                    Value: 0,
                    Name: "£0"
                },
                {
                    Id: "250",
                    Value: 250,
                    Name: "£250"
                },
                {
                    Id: "500",
                    Value: 500,
                    Name: "£500"
                },
                {
                    Id: "1000",
                    Value: 1000,
                    Name: "£1000"
                },
                {
                    Id: "1500",
                    Value: 1500,
                    Name: "£1500"
                },
                {
                    Id: "2000",
                    Value: 2000,
                    Name: "£2000"
                }
            ];

            // POPULATE LEVEL OF COVER OPTIONS
            $scope.TypeOfCoverValueOptions = [{
                    Id: "1",
                    Value: 1,
                    Name: "Essential"
                },
                {
                    Id: "2",
                    Value: 2,
                    Name: "Performance"
                },
                {
                    Id: "3",
                    Value: 3,
                    Name: "Ultimate"
                }
            ];

            // POPULATE CLAIMS OPTIONS
            $scope.ClaimOptions = [{
                    Id: "0",
                    Value: "0",
                    Name: "None"
                },
                {
                    Id: "1",
                    Value: "1",
                    Name: "1"
                },
                {
                    Id: "2",
                    Value: "2",
                    Name: "2"
                },
                {
                    Id: "3",
                    Value: "3",
                    Name: "3+"
                }
            ];

            // COVER START DATE
            $scope.CoverStartDateOptions = GenericServices.GetCoverStartDates();

            // DAY DROPDOWN
            $scope.DayOptions = [];
            for (var x = 1; x <= 31; x++) {
                var value = String(x).replace(/\b(\d{1})\b/g, '0$1');
                $scope.DayOptions.push({ id: x, name: value });
            }

            // MONTH DROPDOWN
            $scope.MonthOptions = [
                { id: 0, name: 'January' },
                { id: 1, name: 'February' },
                { id: 2, name: 'March' },
                { id: 3, name: 'April' },
                { id: 4, name: 'May' },
                { id: 5, name: 'June' },
                { id: 6, name: 'July' },
                { id: 7, name: 'August' },
                { id: 8, name: 'September' },
                { id: 9, name: 'October' },
                { id: 10, name: 'November' },
                { id: 11, name: 'December' }
            ];

            // DOB YEAR DROPDOWN
            $scope.DateOfBirthYearOptions = [];
            // POPUALTE YEAR DROPDOWN
            var today = new Date();
            var currentYear = today.getFullYear();
            // 2 YEARS FORWARD FROM CURRENT YEAR
            var maxYear = new Date(today.setFullYear(today.getFullYear() + 1)).getFullYear();
            // 17 YEARS BACK FROM CURRENT YEAR
            var minYear = new Date(today.setFullYear(today.getFullYear() - 90)).getFullYear();

            for (x = (currentYear - 17); x >= minYear; x--) {
                $scope.DateOfBirthYearOptions.push({ id: x, name: x });
            }


        }]);

})();
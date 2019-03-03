(function() {
    'use strict';

    angular
        .module('app')
        .controller('Bicycle', Bicycle);
        
    Bicycle.$inject = ['$scope', '$log', 'Common', 'BicycleServices', 'YJWebService'];
    
    function Bicycle ($scope, $log, Common, BicycleServices, YJWebService) {

        $scope.Basket = {
            BicycleQuotes: [{}]
        };

        $scope.WebServiceMessage = YJWebService.HelloWorld();
        
        /*
        YJWebService.HelloWorld()
            .then(function (response) {
                $log.info('RESPONSE:', response);
                $scope.WebServiceMessage = response;
            });
        */

        $scope.LengthOfCoverOptions = BicycleServices.GetLengthOfCoverOptions();
        $scope.BicycleTypeOptions = BicycleServices.GetBicycleTypeOptions();
        $scope.HelmetAndClothingValueOptions = BicycleServices.GetHelmetAndClothingValueOptions();
        $scope.TypeOfCoverValueOptions = BicycleServices.GetTypeOfCoverOptions();
        $scope.ClaimOptions = BicycleServices.GetClaimsOptions();
        $scope.CoverStartDateOptions = Common.GetCoverStartDates(30);
        $scope.DayOptions = Common.GetDayOptions()
        $scope.MonthOptions = Common.GetFullMonthOptions();
        $scope.DateOfBirthYearOptions = Common.GetBirthdayYearOptions(18, 75);

        $scope.BicycleText = "bicycle";
        $scope.TotalBicycleValue = 0;
        $scope.ShowAddBicycle = true;

        // ADD BICYCLE
        $scope.AddBicycle = function() {
            if (angular.isUndefined($scope.Basket.BicycleQuotes[0].Bicycles)) {
                $scope.Basket.BicycleQuotes[0].Bicycles = [];
            }

            let identifier = Math.ceil(Math.random() * Math.pow(10, 10));

            $scope.Basket.BicycleQuotes[0].Bicycles
                .push({
                    TempId: identifier,
                    MakeModel: $scope.Bicycle.MakeModel,
                    Value: $scope.Bicycle.Value,
                    Type: $scope.Bicycle.Type,
                    TypeName: Common.GetBicycleType($scope.Bicycle.Type)
                });
        
            $scope.TotalBicycleValue += parseInt($scope.Bicycle.Value, 10);

            $scope.Bicycle = {};
        };

        // REMOVE BICYCLE
        $scope.RemoveBicycle = function (index) {
            $scope.Basket.BicycleQuotes[0].Bicycles.splice(index, 1);
        }

        $scope.CheckDateOfBirth = function () {
            if ($scope.DateOfBirthDay && $scope.DateOfBirthMonth && $scope.DateOfBirthYear) {
                $scope.Basket.BicycleQuotes[0].DateOfBirth = new Date(Date.UTC($scope.DateOfBirthYear, $scope.DateOfBirthMonth, $scope.DateOfBirthDay));
                $scope.Basket.BicycleQuotes[0].DateOfBirth.toUTCString();
            }
        }

    };

})();

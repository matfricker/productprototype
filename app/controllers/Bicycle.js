(function() {
    'use strict';

    angular
        .module('app')
        .controller('Bicycle', Bicycle);
        
    Bicycle.$inject = ['$scope', '$log', 'Generic', 'BicycleServices'];
    
    function Bicycle ($scope, $log, Generic, BicycleServices) {

        $scope.Basket = {
            BicycleQuotes: [{}]
        };

        $scope.LengthOfCoverOptions = BicycleServices.GetLengthOfCoverOptions();
        $scope.BicycleTypeOptions = BicycleServices.GetBicycleTypeOptions();
        $scope.HelmetAndClothingValueOptions = BicycleServices.GetHelmetAndClothingValueOptions();
        $scope.TypeOfCoverValueOptions = BicycleServices.GetTypeOfCoverOptions();
        $scope.ClaimOptions = BicycleServices.GetClaimsOptions();
        $scope.CoverStartDateOptions = Generic.GetCoverStartDates(30);
        $scope.DayOptions = Generic.GetDayOptions()
        $scope.MonthOptions = Generic.GetFullMonthOptions();
        $scope.DateOfBirthYearOptions = Generic.GetBirthdayYearOptions(18, 75);

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
                    TypeName: Generic.GetBicycleType($scope.Bicycle.Type)
                });
        
            $scope.TotalBicycleValue += parseInt($scope.Bicycle.Value, 10);

            $scope.Bicycle = {};
        };

        // REMOVE BICYCLE
        $scope.RemoveBicycle = function (index) {
            $scope.Basket.BicycleQuotes[0].Bicycles.splice(index, 1);
        }

    };

})();
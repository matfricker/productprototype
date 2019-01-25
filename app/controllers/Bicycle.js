(function() {
    'use strict';

    angular
        .module('app')
        .controller('Bicycle', Bicycle);
        
    Bicycle.$inject = ['$scope', '$log', 'GenericServices', 'BicycleServices'];
    
    function Bicycle ($scope, $log, GenericServices, BicycleServices) {

        $scope.Basket = {};
        $scope.Basket.BicycleQuotes = [{
            Bicycles: []
        }];

        $scope.LengthOfCoverOptions = BicycleServices.GetLengthOfCoverOptions();
        $scope.BicycleTypeOptions = BicycleServices.GetBicycleTypeOptions();
        $scope.HelmetAndClothingValueOptions = BicycleServices.GetHelmetAndClothingValueOptions();
        $scope.TypeOfCoverValueOptions = BicycleServices.GetTypeOfCoverOptions();
        $scope.ClaimOptions = BicycleServices.GetClaimsOptions();
        $scope.CoverStartDateOptions = GenericServices.GetCoverStartDates(30);
        $scope.DayOptions = GenericServices.GetDayOptions()
        $scope.MonthOptions = GenericServices.GetFullMonthOptions();
        $scope.DateOfBirthYearOptions = GenericServices.GetBirthdayYearOptions(18, 75);

        $scope.BicycleText = "bicycle";
        $scope.TotalBicycleValue = 0;
        $scope.ShowAddBicycle = true;

        // ADD BICYCLE
        $scope.AddBicycle = function() {
            $scope.Basket.BicycleQuotes[0].Bicycles
                .push({
                    TempId: Date.now(),
                    MakeModel: $scope.Bicycle.MakeModel,
                    Value: $scope.Bicycle.Value,
                    Type: $scope.Bicycle.Type,
                    TypeName: GenericServices.GetBicycleType($scope.Bicycle.Type)
                });

            $scope.TotalBicycleValue += parseInt($scope.Bicycle.Value, 10);

            // CLEAR FORM VALUES
            $scope.Bicycle = {};
        };

        // REMOVE BICYCLE
        $scope.RemoveBicycle = function (index) {
            $scope.Basket.BicycleQuotes[0].Bicycles.splice(index, 1);
        }

    };

})();
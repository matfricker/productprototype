(function() {
    'use strict';

    angular
        .module('app')
        .controller('Bicycle', Bicycle);
        
    Bicycle.$inject = ['$scope', '$log', 'GenericServices', 'BicycleServices'];
    
    function Bicycle ($scope, $log, GenericServices, BicycleServices) {

        $scope.Title = "Product";

        $scope.Basket = {};
        $scope.Basket.BicycleQuotes = [{
            Bicycles: []
        }];

        $scope.LengthOfCoverOptions = BicycleServices.GetLengthOfCoverOptions();
        $scope.BicycleTypeOptions = BicycleServices.GetBicycleTypeOptions();

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

        $scope.HelmetAndClothingValueOptions = BicycleServices.GetHelmetAndClothingValueOptions();
        $scope.TypeOfCoverValueOptions = BicycleServices.GetTypeOfCoverOptions();
        $scope.ClaimOptions = BicycleServices.GetClaimsOptions();
        $scope.CoverStartDateOptions = GenericServices.GetCoverStartDates();
        $scope.DayOptions = GenericServices.GetDayOptions()
        $scope.MonthOptions = GenericServices.GetFullMonthOptions();
        $scope.DateOfBirthYearOptions = GenericServices.GetBirthdayYearOptions();

    };

})();
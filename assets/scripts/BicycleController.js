module.controller('BicycleController', ['$scope', '$log', 'GenericServices', function($scope, $log, GenericServices) {

    $scope.Title = "Product";

    $scope.Basket = {};
    $scope.Basket.BicycleQuotes = [{
        Bicycles: [],
        TypeOfCover: 3
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
    // DOB DAY DROPDOWN
    $scope.DayOptions = GenericServices.DayOptions();
    // DOB MONTH DROPDOWN
    $scope.MonthOptions = GenericServices.MonthOptions();
    // DOB YEAR DROPDOWN
    $scope.DateOfBirthYearOptions = GenericServices.RangedYearOptions(17, 90);

    $scope.ChangeDateOfBirthDate = function() {
        var day = $scope.Basket.BicycleQuotes[0].DateOfBirthDay;
        var month = $scope.Basket.BicycleQuotes[0].DateOfBirthMonth;
        var year = $scope.Basket.BicycleQuotes[0].DateOfBirthYear;

        if ((angular.isDefined(day) && !isNaN(day)) && (angular.isDefined(month) && !isNaN(month)) && (angular.isDefined(year) && !isNaN(year))) {
            $scope.Basket.BicycleQuotes[0].DateOfBirth = new Date(Date.UTC(year, month, day, 0, 0, 0, 0));
            $scope.Basket.BicycleQuotes[0].ValidDateOfBirth = GenericServices.ValidDate(year, month, day);
            $scope.ValidateDateOfBirth($scope.Basket.BicycleQuotes[0].DateOfBirth);
        } else {
            $scope.Basket.BicycleQuotes[0].DateOfBirth = null;
            $scope.Basket.BicycleQuotes[0].ValidDateOfBirth = false;
        }

        if (
            $scope.BicycleQuoteForm.$submitted && !$scope.Basket.BicycleQuotes[0].ValidDateOfBirth ||
            (!$scope.Basket.BicycleQuotes[0].ValidDateOfBirth && ($scope.BicycleQuoteForm.DateOfBirthDay.$dirty || $scope.BicycleQuoteForm.DateOfBirthMonth.$dirty || $scope.BicycleQuoteForm.DateOfBirthYear.$dirty)) ||
            ($scope.IsMinMaxDateOfBirthInvalid && ($scope.BicycleQuoteForm.DateOfBirthDay.$dirty || $scope.BicycleQuoteForm.DateOfBirthMonth.$dirty || $scope.BicycleQuoteForm.DateOfBirthYear.$dirty))) {
            $scope.IsDateOfBirthInvalid = true;
        } else {
            $scope.IsDateOfBirthInvalid = false;
        }
    };


}]);
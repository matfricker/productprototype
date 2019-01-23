module.controller('BicycleController', ['$scope', '$log', '$http', '$q', '$window', 'CustomServices',
    function($scope, $log, $http, $q, $window, CustomServices) {

        $scope.Basket = {
            Id: 0,
            AddOnQuotes: [],
            BicycleQuotes: [],
            TravelQuotes: [],
            Customer: {},
            PromotionalCode: "",
            IsRenewal: false,
            IsAdjustment: false,
            CreatedDate: null
        };

        $scope.InitBicycleQuote = [{
            Bicycles: [],
            Age: 'N/A',
            IsRenewal: false,
            IsAdjustment: false,
            ValidDateOfBirth: false,
            Selected: {},
            TypeOfCover: 3, // ULTIMATE BY DEFAULT
            AccessoriesValue: null,
            HelmetAndClothingValue: 0,
            WheelsetValue: 0
        }];

        $scope.BasketCost = { Total: '0.00' };

        // BICYCLE
        $scope.ShowAddBicycle = true;
        $scope.IsBicycleInEditMode = false;
        $scope.IsAddToQuoteDisabled = true;
        $scope.BicycleText = "bicycles";
        $scope.MinBicyleValue = 250;
        $scope.MaxBicycleValue = 15000;
        $scope.IsBicycleValueTooHigh = false;
        $scope.TotalBicycleValue = 0;
        $scope.TotalCoverInsured = 0;
        // OTHER COVER
        $scope.TotalNonBicycleValue = 0;
        // TYPE OF COVER
        $scope.IsShortTerm = false;
        $scope.IsTypeOfCoverDisabled = false;
        $scope.ChangedToPerformance = false;
        $scope.ChangedToUltimate = false;
        // COVER START DATE
        $scope.CoverStartDateOptions = CustomServices.GetCoverStartDates();
        // DATE OF BIRTH
        $scope.MinAge = 18;
        $scope.MaxAge = 85;
        $scope.IsDateOfBirthInvalid = false;
        $scope.IsMinMaxDateOfBirthInvalid = false;
        // CLAIMS
        $scope.ClaimsInvalid = false;
        // GENERAL
        $scope.CurrentDate = fulldate;
        $scope.ErrorMessage = "";
        $scope.Proccessing = false;
        $scope.Statments = false;
        $scope.StatementRequired = true;
        // CROSS SELLING
        $scope.HasBicycleAndTravelInBasket = false;
        $scope.HasAnnualBicyclePolicy = false;
        $scope.HasAnnualTravelPolicy = false;
        $scope.CanCrossSell = false;
        $scope.HideBicycleForm = true;

        // CHECK IF USER IS AUTHENTICATED
        CustomServices.GetUserAuthentication().
        then(function(response) {
            $scope.IsAuthenticated = response.Authentication;
            if ($scope.IsAuthenticated) {
                $log.info('AUTHENTICATED');
            } else {
                $log.info('NOT AUTHENTICATED');
            }
        });

        $scope.TruncateString = function(str, count) {
            if (str) {
                return CustomServices.TruncateString(str, count);
            }
        };

        $scope.GetBicycleTypeOfCover = function(typeId) {
            return CustomServices.GetBicycleTypeOfCover(typeId);
        };

        // GET BASKET FROM SESSION TO POPULATE PAGE
        $http.get('/basket/getbasket/' + '?nocache=' + new Date().getTime()).
        then(function(response) {

            if (response.data.Basket !== null) {
                // POPULATE BASKET
                $scope.Basket = response.data.Basket;
                if (response.data.Basket.BicycleQuotes.length > 0) {
                    // CHECK IF QUOTE HAS BOTH BICYCLE AND TRAVEL
                    if (response.data.Basket.BicycleQuotes.length > 0 && response.data.Basket.TravelQuotes.length > 0) {
                        $scope.HasBicycleAndTravelInBasket = true;
                    }

                    // ASSIGN SESSION DATA TO BICYCLEQUOTE MODEL
                    $scope.Basket.BicycleQuotes[0] = response.data.Basket.BicycleQuotes[0];

                    $scope.Basket.BicycleQuotes[0].IsNewBusiness = ($scope.Basket.BicycleQuotes[0].Status === 0);
                    $scope.Basket.BicycleQuotes[0].IsAdjustment = ($scope.Basket.BicycleQuotes[0].Status === 15);
                    $scope.Basket.BicycleQuotes[0].IsRenewal = ($scope.Basket.BicycleQuotes[0].Status === 28);

                    if (angular.isDefined($scope.Basket.BicycleQuotes[0].IsNewBusiness)) {
                        $log.info('BICYCLE NB: ' + $scope.Basket.BicycleQuotes[0].IsNewBusiness);
                    }

                    if (angular.isDefined($scope.Basket.BicycleQuotes[0].IsRenewal)) {
                        $log.info('BICYCLE RNL: ' + $scope.Basket.BicycleQuotes[0].IsRenewal);
                    }

                    if (angular.isDefined($scope.Basket.BicycleQuotes[0].IsAdjustment)) {
                        $log.info('BICYCLE MTA: ' + $scope.Basket.BicycleQuotes[0].IsAdjustment);
                    }

                    if ($scope.Basket.BicycleQuotes[0].Bicycles === null) {
                        $scope.Basket.BicycleQuotes[0].Bicycles = [];
                    }

                    $scope.Basket.BicycleQuotes[0].Selected = {};
                    $scope.CalculateTotalBicycleValue();
                    $scope.ChangeBikeText();

                    if ($scope.Basket.BicycleQuotes[0].Bicycles.length > 0) {
                        $scope.ShowAddBicycle = false;
                    } else {
                        $scope.ShowAddBicycle = true;
                    }

                    // GIVE BICYCLES TEMPID SO THEY ARE EDITABLE
                    for (var i = 0; i < $scope.Basket.BicycleQuotes[0].Bicycles.length; i++) {
                        $scope.Basket.BicycleQuotes[0].Bicycles[i].TempId = i;
                    }

                    if ($scope.Basket.BicycleQuotes[0].AccessoriesValue < 250) {
                        $scope.Basket.BicycleQuotes[0].AccessoriesValue = 250;
                    }

                    // FOR VALIDATION SET START DATE TO NULL EXCEPT RENEWAL QUOTES
                    if ($scope.Basket.BicycleQuotes[0].IsNewBusiness) {
                        $scope.Basket.BicycleQuotes[0].CoverStartDate = null;
                    }

                    // SET DATES BELOW TO NULL IF 0001-01-01
                    if ($scope.Basket.BicycleQuotes[0].CreatedDate.toUTCString() === new Date('0001-01-01').toUTCString()) {
                        $scope.Basket.BicycleQuotes[0].CreatedDate = null;
                    }

                    if ($scope.Basket.BicycleQuotes[0].DateOfBirth.toUTCString() === new Date('0001-01-01').toUTCString()) {
                        $scope.Basket.BicycleQuotes[0].DateOfBirth = null;
                        $scope.Basket.BicycleQuotes[0].Age = "N/A";
                        $scope.Basket.BicycleQuotes[0].ValidDateOfBirth = false;
                    } else {
                        var DateOfBirthDay = $scope.Basket.BicycleQuotes[0].DateOfBirth.getDate().toString();
                        var DateOfBirthMonth = $scope.Basket.BicycleQuotes[0].DateOfBirth.getMonth().toString();
                        var DateOfBirthYear = $scope.Basket.BicycleQuotes[0].DateOfBirth.getFullYear().toString();

                        $scope.Basket.BicycleQuotes[0].DateOfBirthDay = DateOfBirthDay;
                        $scope.Basket.BicycleQuotes[0].DateOfBirthMonth = DateOfBirthMonth;
                        $scope.Basket.BicycleQuotes[0].DateOfBirthYear = DateOfBirthYear;

                        // VALIDATE
                        $scope.Basket.BicycleQuotes[0].ValidDateOfBirth = CustomServices.ValidDate(DateOfBirthYear, DateOfBirthMonth, DateOfBirthDay);
                        $scope.ValidateDateOfBirth($scope.Basket.BicycleQuotes[0].DateOfBirth);
                    }

                    if ($scope.Basket.BicycleQuotes[0].FinanceDateOfFirstPayment.toUTCString() === new Date('0001-01-01').toUTCString()) {
                        $scope.Basket.BicycleQuotes[0].FinanceDateOfFirstPayment = null;
                    }

                    if ($scope.Basket.BicycleQuotes[0].InceptionDate.toUTCString() === new Date('0001-01-01').toUTCString()) {
                        $scope.Basket.BicycleQuotes[0].InceptionDate = null;
                    }

                    if ($scope.Basket.BicycleQuotes[0].RenewalDate.toUTCString() === new Date('0001-01-01').toUTCString()) {
                        $scope.Basket.BicycleQuotes[0].RenewalDate = null;
                    }

                    // SET DIRECT DEBIT TO FALSE IF SET TO TRUE
                    if ($scope.Basket.BicycleQuotes[0].IsDirectDebit && !$scope.Basket.BicycleQuotes[0].IsAdjustment) {
                        $scope.Basket.BicycleQuotes[0].IsDirectDebit = false;
                    }

                    if (angular.isDefined($scope.Basket.BicycleQuotes[0].IsDirectDebit)) {
                        $log.info('BICYCLE DD : ' + $scope.Basket.BicycleQuotes[0].IsDirectDebit);
                    }

                    var opt;
                    for (opt = 1; opt < 5; opt++) {
                        $scope.LengthOfCoverOptions[opt].ShowRenewal = !$scope.Basket.BicycleQuotes[0].IsRenewal;
                        $scope.LengthOfCoverOptions[opt].ShowAdjustment = !$scope.Basket.BicycleQuotes[0].IsAdjustment;
                    }

                    $scope.ShortTermCheck();
                    $scope.CalaculateTotalCoverInsured();
                    $scope.TotalCoverTooHigh();
                }

                $scope.Basket.IsRenewal = CustomServices.ContainsRenewalQuote($scope.Basket);
                $scope.Basket.IsAdjustment = CustomServices.ContainsAdjustmentQuote($scope.Basket);
            }

            if ($scope.Basket.CreatedDate !== null) {
                if ($scope.Basket.CreatedDate.toUTCString() === new Date('0001-01-01').toUTCString()) {
                    $scope.Basket.CreatedDate = null;
                }
            }

            // CHECK IF ANY PROMO CODE COOKIES
            if (!$scope.Basket.PromotionalCode) {
                $http.get('/account/checkcookieforpromotionalcode/' + '?nocache=' + new Date().getTime()).
                then(function(response) {
                    if (response.data.HasDiscountCode && !$scope.IsAdjustment && !$scope.IsRenewal) {
                        $scope.Basket.PromotionalCode = response.data.DiscountCode;
                        $scope.ApplyPromotionalCode($scope.Basket.PromotionalCode);
                    }
                });
            }

            // UPDATE BASKET
            $scope.UpdateBasket()
                .then(function(result) {
                    if ($scope.Basket.BicycleQuotes.length < 1) { // IF NO QUOTE INITALISE QUOTE
                        $scope.Basket.BicycleQuotes = $scope.InitBicycleQuote;
                    }
                });

            $scope.CheckCrossSell();
        });

        // USER STATE
        CustomServices.GetUserState().
        then(function(response) {
            $scope.UserState = angular.fromJson(response.data);
            $scope.HasAnnualBicyclePolicy = $scope.UserState.HasAnnualBicyclePolicy;
            $scope.HasAnnualTravelPolicy = $scope.UserState.HasAnnualTravelPolicy;
            $scope.BeenToBicycle = $scope.UserState.BeenToBicycle;
            $scope.BeenToTravel = $scope.UserState.BeenToTravel;
            $scope.IsEdit = $scope.UserState.EditMode;
        });

        // CROSS SELLING
        $scope.CheckCrossSell = function() {
            if ($scope.Basket.TravelQuotes.length > 0 || ($scope.Basket.TravelQuotes.length > 0 && $scope.IsEdit)) {
                if (($scope.HasAnnualBicyclePolicy && $scope.HasAnnualTravelPolicy) || $scope.HasBicycleAndTravelInBasket) {
                    $scope.CanCrossSell = false;
                } else {
                    $scope.CanCrossSell = true;
                    $('.sidebar').css('visibility', 'hidden');
                }
            } else {
                $scope.CanCrossSell = false;
            }
        };

        $scope.EnableBicycleForm = function() {
            $scope.HideBicycleForm = false;
            $('.sidebar').css('visibility', 'visible');
        };

        // PROMOTIONAL CODE
        $scope.ApplyPromotionalCode = function(promoCode) {
            if (angular.isDefined(promoCode)) {
                if (angular.isDefined($scope.Basket.Customer.Id) &&
                    (promoCode === 'YJ' + padLeft($scope.Basket.Customer.Id, 6).toString())) {
                    $scope.PromoCode = null;
                } else {
                    $scope.Basket.PromotionalCode = promoCode.toUpperCase();
                }
            } else {
                $scope.Basket.PromotionalCode = promoCode;
            }

            // UPDATE BASKET
            $scope.VerfiyUpdateBasket();
            $scope.PromoCode = null;
        };

        // GET BICYCLE GRID TEMPLATE
        $scope.GetTemplate = function(bicycle) {
            if (bicycle.TempId === $scope.Basket.BicycleQuotes[0].Selected.TempId) {
                return 'edit';
            } else {
                bicycle.TypeName = CustomServices.GetBicycleType(bicycle.Type);
                return 'display';
            }
        };

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

        // ASSIGN LENGTH OF COVER WHEN CHANGED
        $scope.LengthOfCoverChange = function() {
            $scope.VerfiyUpdateBasket();
            $scope.ShortTermCheck();
        };

        $scope.ShortTermCheck = function() {
            if ($scope.Basket.BicycleQuotes[0].LengthOfCover < 365) {
                $scope.IsShortTerm = true;
            } else {
                $scope.IsShortTerm = false;
            }
        };

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

        // CHANGE BIKE TEXT ABOVE BIKE GRID
        $scope.ChangeBikeText = function() {
            if ($scope.Basket.BicycleQuotes[0].Bicycles.length === 0 || $scope.Basket.BicycleQuotes[0].Bicycles.length > 1) {
                $scope.BicycleText = "bicycles";
            } else {
                $scope.BicycleText = "bicycle";
            }
        };

        $scope.BicycleValueTooHigh = function(value) {
            return $scope.IsBicycleValueTooHigh = value > $scope.MaxBicycleValue;
        };

        $scope.CalaculateTotalCoverInsured = function() {

            // NON BICYCLE COVER
            $scope.TotalNonBicycleValue = 0;

            // £250 ACCESSORIES AS STANDARD
            var accessoriesLess250Standard = 0;
            if ($scope.Basket.BicycleQuotes[0].AccessoriesValue > 250) {
                accessoriesLess250Standard = $scope.Basket.BicycleQuotes[0].AccessoriesValue - 250;
            }

            $scope.TotalNonBicycleValue = accessoriesLess250Standard + $scope.Basket.BicycleQuotes[0].HelmetAndClothingValue + $scope.Basket.BicycleQuotes[0].WheelsetValue;

            // CALCULATE TOTAL COVER INSURED
            $scope.TotalCoverInsured = $scope.TotalNonBicycleValue + $scope.TotalBicycleValue;
        };

        $scope.TotalCoverTooHigh = function() {

            switch ($scope.Basket.BicycleQuotes[0].TypeOfCover) {
                case 1: // ESSENTIAL
                    $scope.MaxTotalCoverInsured = 3000;
                    break;
                case 2: // PERFORMANCE
                    $scope.MaxTotalCoverInsured = 10000;
                    break;
                default: // ULTIMATE
                    $scope.MaxTotalCoverInsured = 50000;
                    break;
            }

            $scope.IsTotalCoverTooHigh = ($scope.TotalCoverInsured > $scope.MaxTotalCoverInsured);
        };

        $scope.ValidateTypeOfCover = function(typeOfCover) {
            typeOfCover = parseInt(typeOfCover, 10);
            if (angular.isDefined($scope.Basket.BicycleQuotes[0])) {

                $scope.EssentialMaxBicycle = 1000;
                $scope.EssentialMaxTotal = 3000;

                $scope.PerformanceMaxBicycle = 3000;
                $scope.PerformanceMaxTotal = 10000;

                $scope.UltimateMaxBicycle = 15000;
                $scope.UltimateMaxTotal = 50000;

                $scope.IsAnyBicycleOverSingleMax = false;
                if (angular.isDefined($scope.Basket.BicycleQuotes[0].Bicycles)) {
                    for (var i = 0; i < $scope.Basket.BicycleQuotes[0].Bicycles.length; i++) {
                        $scope.BicycleValue = $scope.Basket.BicycleQuotes[0].Bicycles[i].Value;
                        if (typeOfCover === 1) {
                            if ($scope.BicycleValue > $scope.EssentialMaxBicycle) {
                                $scope.IsAnyBicycleOverSingleMax = true;
                                break;
                            }
                        } else if (typeOfCover === 2) {
                            if ($scope.BicycleValue > $scope.PerformanceMaxBicycle) {
                                $scope.IsAnyBicycleOverSingleMax = true;
                                break;
                            }
                        } else {
                            if ($scope.BicycleValue > $scope.UltimateMaxBicycle) {
                                $scope.IsAnyBicycleOverSingleMax = true;
                                break;
                            }
                        }
                    }
                }

                if (($scope.IsShortTerm && typeOfCover === 1) ||
                    ($scope.IsAnyBicycleOverSingleMax && typeOfCover === 1) ||
                    ($scope.TotalBicycleValue > $scope.EssentialMaxTotal && typeOfCover === 1) ||
                    ($scope.TotalCoverInsured > $scope.EssentialMaxTotal && typeOfCover === 1) ||
                    ($scope.IsAnyBicycleOverSingleMax && typeOfCover === 2) ||
                    ($scope.TotalCoverInsured > $scope.PerformanceMaxTotal && typeOfCover === 2)) {

                    // CHANGE TYPE OF COVER IF THE TYPE SELECTED HAS BEEN DISABLED
                    if ($scope.Basket.BicycleQuotes[0].TypeOfCover === typeOfCover) {
                        if ($scope.TotalCoverInsured > $scope.EssentialMaxTotal && typeOfCover === 1) {
                            // RECOMMEND PERFORMANCE
                            $scope.Basket.BicycleQuotes[0].TypeOfCover = 2;
                            $scope.ChangedToPerformance = true;
                            $scope.ChangedToUltimate = false;
                        } else {
                            // RECOMMEND ULTIMATE
                            $log.debug('UPGRADED TO ULTIMATE');
                            $scope.Basket.BicycleQuotes[0].TypeOfCover = 3;
                            $scope.ChangedToPerformance = false;
                            $scope.ChangedToUltimate = true;
                        }
                    }

                    $scope.CalaculateTotalCoverInsured();
                    $scope.TotalCoverTooHigh();

                    return true;
                } else {
                    return false;
                }
            }

            return true;
        };

        $scope.ValidateMinBicycle = function(value) {
            if (value < $scope.MinBicyleValue) {
                return true;
            } else {
                return false;
            }
        };

        // DISABLE ADD TO QUOTE IF VALUES NOT PROVIDED
        $scope.ValidateBike = function() {
            if ((angular.isUndefined($scope.Bicycle.MakeModel) || $scope.Bicycle.MakeModel === null || $scope.Bicycle.MakeModel === "") ||
                (angular.isUndefined($scope.Bicycle.Value) || $scope.Bicycle.Value === null || $scope.Bicycle.Value === "") ||
                (angular.isUndefined($scope.Bicycle.Type) || $scope.Bicycle.Type === null) ||
                $scope.Bicycle.Value > $scope.MaxBicycleValue ||
                $scope.ValidateMinBicycle($scope.Bicycle.Value)
            ) {
                $scope.IsAddToQuoteDisabled = true;
            } else {
                $scope.IsAddToQuoteDisabled = false;
            }
        };

        // ADD ANOTHER BICYCLE
        $scope.AddAnotherBicycle = function() {
            $scope.ShowAddBicycle = true;
            $scope.IsBicycleInEditMode = true;
        };

        // ADD BICYCLE INTO GRID
        $scope.AddBicycle = function() {
            // CREATE BICYCLE OBJECT
            $scope.Basket.BicycleQuotes[0].Bicycles.push({
                TempId: Date.now(),
                MakeModel: $scope.Bicycle.MakeModel,
                Value: $scope.Bicycle.Value,
                Type: $scope.Bicycle.Type,
                TypeName: CustomServices.GetBicycleType($scope.Bicycle.Type)
            });

            // CLEAR FORM VALUES
            $scope.Bicycle = {};

            $scope.IsBicycleInEditMode = false;
            $scope.ShowAddBicycle = false;
            $scope.IsAddToQuoteDisabled = true;
            $scope.ChangeBikeText();
            $scope.CalculateTotalBicycleValue();
            // CALLED TO CHECK IF TYPE OF COVER CHANGED BEFORE UPDATE BASKET
            $scope.ValidateTypeOfCover($scope.Basket.BicycleQuotes[0].TypeOfCover);

            // UPDATE BASKET
            $scope.VerfiyUpdateBasket();
        };

        // EDIT BICYCLE IN GRID
        $scope.EditBicycle = function(bicycle) {
            $scope.Basket.BicycleQuotes[0].Selected = angular.copy(bicycle);
            $scope.IsBicycleInEditMode = true;
        };

        // REMOVE BICYCLE FROM GRID
        $scope.RemoveBicycle = function(index) {
            // ONLY CALL BICYCLEQUOTESIMPLE IF MORE THAN ONE BIKE
            if ($scope.Basket.BicycleQuotes[0].Bicycles.length > 1) {
                $scope.Basket.BicycleQuotes[0].Bicycles.splice(index, 1);
                $scope.ChangeBikeText();
                $scope.CalculateTotalBicycleValue();
                $scope.CalaculateTotalCoverInsured();
                $scope.TotalCoverTooHigh();

                // UPDATE BASKET
                $scope.VerfiyUpdateBasket();
            }
        };

        // UPDATE WHILE EDITING BICYCLE IN GRID
        $scope.UpdateBicycle = function(bicycle, index) {
            // UPDATE BICYCLE TYPE NAME
            bicycle.TypeName = CustomServices.GetBicycleType(bicycle.Type);
            $scope.Basket.BicycleQuotes[0].Bicycles[index] = angular.copy($scope.Basket.BicycleQuotes[0].Selected);
            $scope.Basket.BicycleQuotes[0].Selected = {};
            $scope.IsBicycleInEditMode = false;
            $scope.CalculateTotalBicycleValue();
            // CALLED TO CHECK IF TYPE OF COVER CHANGED BEFORE UPDATE BASKET
            $scope.ValidateTypeOfCover($scope.Basket.BicycleQuotes[0].TypeOfCover);

            // UPDATE BASKET
            $scope.VerfiyUpdateBasket();
        };

        // CANCEL EDITING BICYCLE IN GRID + REVERT CHANGES
        $scope.Cancel = function(index) {
            $scope.IsBicycleInEditMode = false;
            $scope.Basket.BicycleQuotes[0].Selected = {};
        };

        $scope.CancelAddBicycle = function() {
            $scope.ShowAddBicycle = false;
            $scope.IsBicycleInEditMode = false;
        }

        // TOTAL VALUE OF BIKES 
        $scope.CalculateTotalBicycleValue = function() {
            var Total = 0;
            for (var i = 0; i < $scope.Basket.BicycleQuotes[0].Bicycles.length; i++) {
                var bike = $scope.Basket.BicycleQuotes[0].Bicycles[i];
                Total += bike.Value;
            }
            return $scope.TotalBicycleValue = Total;
        };

        // ACCESSORIES VALUE CHANGE
        $scope.AccessoriesValueBlur = function() {

            if ($scope.Basket.BicycleQuotes[0].AccessoriesValue < 250) {
                $scope.Basket.BicycleQuotes[0].AccessoriesValue = 250;
            }

            $scope.CalaculateTotalCoverInsured();
            $scope.TotalCoverTooHigh();
            // UPDATE BASKET
            $scope.VerfiyUpdateBasket();
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

        // HELMET AND CLOTHING VALUE CHANGE
        $scope.HelmetAndClothingValueChange = function() {
            $scope.CalaculateTotalCoverInsured();
            $scope.TotalCoverTooHigh();

            // UPDATE BASKET
            $scope.VerfiyUpdateBasket();
        };

        $scope.WheelsetValueBlur = function() {
            if ($scope.Basket.BicycleQuotes[0].WheelsetValue === null) {
                $scope.Basket.BicycleQuotes[0].WheelsetValue = 0;
            }
            $scope.CalaculateTotalCoverInsured();
            $scope.TotalCoverTooHigh();

            // UPDATE BASKET
            $scope.VerfiyUpdateBasket();
        };

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

        // LEVEL OF COVER VALUE CHANGE
        $scope.TypeOfCoverChange = function() {
            // IF TYPE OF COVER SET TO ESSENTIAL SET WHEELSET VALUE TO ZERO
            if ($scope.Basket.BicycleQuotes[0].TypeOfCover === 1 && $scope.Basket.BicycleQuotes[0].WheelsetValue > 0) {
                $scope.Basket.BicycleQuotes[0].WheelsetValue = 0;
            }

            // HIDE CHANGED COVER BOX
            if ($scope.ChangedToPerformance || $scope.ChangedToUltimate) {
                $scope.CloseTierWarning();
            }

            $scope.CalaculateTotalCoverInsured();
            $scope.TotalCoverTooHigh();

            // UPDATE BASKET
            $scope.VerfiyUpdateBasket();
        };

        $scope.CloseTierWarning = function() {
            $scope.ChangedToPerformance = false;
            $scope.ChangedToUltimate = false;
        }

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

        $scope.ValidateClaims = function() {
            if ($scope.Basket.BicycleQuotes[0].NumberOfClaimsInLastThreeYears > 2) {
                $scope.ClaimsInvalid = true;
            } else {
                $scope.ClaimsInvalid = false;
            }
        };

        $scope.ChangeCoverStartDate = function() {
            if (angular.isUndefined($scope.Basket.BicycleQuotes[0].CoverStartDate)) {
                $scope.Basket.BicycleQuotes[0].CoverStartDate = null;
            }
        };

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

        // YEAR DROPDOWN
        $scope.YearOptions = [];
        // POPUALTE YEAR DROPDOWN
        $scope.today = new Date();
        $scope.currentYear = $scope.today.getFullYear();
        // 2 YEARS FROM CURRENT YEAR
        $scope.maxYear = new Date($scope.today.setFullYear($scope.today.getFullYear() + 1)).getFullYear();

        for (x = $scope.currentYear; x <= $scope.maxYear; x++) {
            $scope.YearOptions.push({ id: x, name: x });
        }

        // DATE OF BIRTH YEAR DROPDOWN
        $scope.DateOfBirthYearOptions = [];
        $scope.minYear = new Date($scope.today.setFullYear($scope.today.getFullYear() - 90)).getFullYear();

        for (x = ($scope.currentYear - 17); x >= $scope.minYear; x--) {
            $scope.DateOfBirthYearOptions.push({ id: x, name: x });
        }

        $scope.ChangeDateOfBirthDate = function() {
            var day = $scope.Basket.BicycleQuotes[0].DateOfBirthDay;
            var month = $scope.Basket.BicycleQuotes[0].DateOfBirthMonth;
            var year = $scope.Basket.BicycleQuotes[0].DateOfBirthYear;

            if ((angular.isDefined(day) && !isNaN(day)) && (angular.isDefined(month) && !isNaN(month)) && (angular.isDefined(year) && !isNaN(year))) {
                $scope.Basket.BicycleQuotes[0].DateOfBirth = new Date(Date.UTC(year, month, day, 0, 0, 0, 0));
                $scope.Basket.BicycleQuotes[0].ValidDateOfBirth = CustomServices.ValidDate(year, month, day);
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

        $scope.ValidateDateOfBirth = function(dateOfBirth) {
            // CALCULATE AGE AT COVER START DATE
            if ($scope.Basket.BicycleQuotes[0].CoverStartDate !== null && angular.isDefined($scope.Basket.BicycleQuotes[0].CoverStartDate)) {
                $scope.Basket.BicycleQuotes[0].Age = parseInt(CustomServices.GetAgeAtInception(dateOfBirth, $scope.Basket.BicycleQuotes[0].CoverStartDate), 10);
            } else {
                $scope.Basket.BicycleQuotes[0].Age = parseInt(CustomServices.GetAge(dateOfBirth), 10);
            }

            if ($scope.Basket.BicycleQuotes[0].Age > $scope.MaxAge) {
                $scope.ErrorMessage = "You need to be " + $scope.MaxAge + " years old or under at cover start date to apply for this policy";
                $scope.IsMinMaxDateOfBirthInvalid = true;
            }

            if ($scope.Basket.BicycleQuotes[0].Age < $scope.MinAge) {
                $scope.ErrorMessage = "You need to be " + $scope.MinAge + " years old or over at cover start date to apply for this policy";
                $scope.IsMinMaxDateOfBirthInvalid = true;
            }

            if ($scope.Basket.BicycleQuotes[0].Age >= $scope.MinAge && $scope.Basket.BicycleQuotes[0].Age <= $scope.MaxAge) {
                $scope.ErrorMessage = "";
                $scope.IsMinMaxDateOfBirthInvalid = false;
            }
        };

        $scope.ValidateForm = function(thisForm) {
            if ($scope.Basket.BicycleQuotes.length > 0) {
                if (thisForm.$invalid ||
                    $scope.Basket.BicycleQuotes[0].LengthOfCover === 0 ||
                    $scope.Basket.BicycleQuotes[0].TypeOfCover === 0 ||
                    $scope.Basket.BicycleQuotes[0].Bicycles.length < 1 ||
                    $scope.IsBicycleInEditMode ||
                    $scope.IsMinMaxDateOfBirthInvalid ||
                    !$scope.Basket.BicycleQuotes[0].ValidDateOfBirth ||
                    (angular.isDefined($scope.BicycleQuoteForm.CoverStartDate) &&
                        ($scope.BicycleQuoteForm.CoverStartDate.$untouched || $scope.BicycleQuoteForm.CoverStartDate.$modelValue === null)) ||
                    $scope.ClaimsInvalid ||
                    $scope.IsTotalCoverTooHigh) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        };

        // SAVE FOR LATER
        $scope.SaveForLater = function() {
            $scope.ClickEvent = "SAVEFORLATER";
            $scope.StatementRequired = false;
            $scope.VerfiyUpdateBasket();
        };

        // PROCEED
        $scope.Proceed = function() {
            $scope.ClickEvent = "PROCEED";
            $scope.StatementRequired = true;
            $scope.VerfiyUpdateBasket();
        };

        // SKIP
        $scope.Skip = function() {
            if ($scope.Basket.BicycleQuotes.length > 0) {
                // REMOVE BICYCLEQUOTE IF SKIPPING
                $scope.Basket.BicycleQuotes = [];
                $scope.UpdateBasket();
            }

            var url = '/product/addon';
            if ($scope.Basket.IsRenewal) {
                url = '/renewal/addon';
            } else if ($scope.Basket.IsAdjustment) {
                url = '/account'; // SHOULDN'T GET HERE, THERE IS NO SKIP (AND NO CROSS-SELLING) ON ADJUSTMENTS.
            }

            $window.location.href = url;
        };

        // BICYCLE DETAILS SUBMITTED
        $scope.SendForm = function() {
            // DISABLE BUTTONS
            $scope.Proccessing = true;
            // NEXT LOCATION DEPENDS ON TYPE(S) OF QUOTE IN BASKET AND WHICH BUTTON WAS CLICKED
            var dashboardUrl = '/account';
            var signInUrl = '/account/signin';
            var nextProductUrl = '/';

            if ($scope.Basket.IsAdjustment) {
                nextProductUrl = '/payment/adjustment';
            } else if ($scope.Basket.TravelQuotes.length > 0) { // HAS TRAVEL QUOTE
                if ($scope.Basket.TravelQuotes.IsRenewal) {
                    nextProductUrl = '/renewal/travel';
                } else {
                    if ($scope.BeenToBicycle && $scope.BeenToTravel) { // ONLY GO TO ADDON IF BEEN TO BICYCLE & TRAVEL
                        nextProductUrl = '/product/addon';
                    } else {
                        nextProductUrl = '/product/travel';
                    }
                }
            } else {
                if ($scope.Basket.IsRenewal) {
                    if ($scope.HasAnnualTravelPolicy) {
                        nextProductUrl = '/renewal/addon';
                    } else {
                        nextProductUrl = '/product/travel';
                    }
                } else {
                    if ($scope.HasAnnualTravelPolicy) {
                        nextProductUrl = '/product/addon';
                    } else {
                        nextProductUrl = '/product/travel';
                    }
                }
            }

            var saveUrl = '/basket/savebasket';
            if ($scope.Basket.IsAdjustment) {
                saveUrl = '/basket/saveadjustmentbasket';
            }

            // IF SAVE FOR LATER CLICKED
            if ($scope.ClickEvent === "SAVEFORLATER") {
                // BICYCLEQUOTE CAN ONLY BE SAVED IF LOGGED IN
                // CHECK IF USER AUTHENTICATED
                if ($scope.IsAuthenticated) {
                    // IF ALREADY AUTHENTICATED  
                    // SAVE BICYCLEQUOTE
                    $http.post(saveUrl, $scope.Basket).
                    then(function(response, status, headers, config) {
                        $window.location.href = dashboardUrl;
                    });
                } else {
                    // IF NOT AUTHENTICATED SEND USER TO LOGIN / REGISTER
                    $window.location.href = signInUrl + "?ReturnUrl=" + encodeURIComponent(dashboardUrl);
                }
            }

            // IF PROCEED CLICKED
            if ($scope.ClickEvent === "PROCEED") {
                // BASKET CAN ONLY BE SAVED IF LOGGED IN
                // CHECK IF USER AUTHENTICATED
                if ($scope.IsAuthenticated) {
                    // IF ALREADY AUTHENTICATED SAVE BASKET AS CUSTOMER DETAILS AVALABLE
                    // SAVE BASKET
                    $http.post(saveUrl, $scope.Basket).
                    then(function(response, status, headers, config) {
                        $window.location.href = nextProductUrl;
                    });
                } else {
                    $window.location.href = signInUrl + "?ReturnUrl=" + encodeURIComponent(nextProductUrl);
                }
            }
            $scope.Proccessing = false;
        };

        // VERIFY UPDATE BASKET
        $scope.VerfiyUpdateBasket = function() {
            // ONLY GET BASKET COSTS IF LENGTH OF COVER SELECTED & AT LEAST ONE BICYCLE HAS BEEN ADDED
            if ($scope.Basket.BicycleQuotes.length > 0 && angular.isDefined($scope.Basket.BicycleQuotes[0].Bicycles)) {
                if ($scope.Basket.BicycleQuotes[0].LengthOfCover !== null && $scope.Basket.BicycleQuotes[0].Bicycles.length > 0) {
                    // UPDATE BASKET
                    $scope.UpdateBasket();
                }
            }

        };

        // UPDATE BASKET
        $scope.UpdateBasket = function() {

            $log.debug('UPDATE BICYCLE');

            var defered = $q.defer();
            var updateUrl = '/basket/updatebasket'; // NB WORKFLOW
            if ($scope.Basket.IsAdjustment) {
                updateUrl = '/basket/updateadjustmentbasket'; // ADJUSTMENT WORKFLOW
            } else if ($scope.Basket.IsRenewal) {
                updateUrl = '/basket/updaterenewalbasket'; // RENEWAL WORKFLOW
            }

            $http.post(updateUrl, $scope.Basket).
            success(function(response) {
                if ($scope.IsAuthenticated) {
                    $scope.Basket.Customer = response.Customer;
                }
                $scope.BasketCost = response.BasketCost;
            }).error(function(data, status, headers, config) {
                $log.info('HTTP POST ERROR UPDATING BASKET');
            });

            defered.resolve(true);
            return defered.promise;

        };

    }
]);
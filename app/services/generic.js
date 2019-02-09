(function() {
    'use strict';

    angular
        .module('app.services')
        .factory('Generic', Generic);
        
        Generic.$inject = ['$http', '$filter'];
        
        function Generic($http, $filter) {
            
            return {
                GetBasket: getBasket,
                SaveBasket: saveBasket,
                UpdateBasket: updateBasket,
                GetUserAuthentication: getUserAuthentication,
                GetUserState: getUserState,
                GetAge: getAge,
                GetAgeAtInception: getAgeAtInception,
                CheckCookiesForPromotionalCodes: checkCookiesForPromotionalCodes,
                GetRegionOfCover: getRegionOfCover,
                GetBicycleType: getBicycleType,
                GetBicycleTypeOfCover: getBicycleTypeOfCover,
                GetTravelTypeOfCover: getTravelTypeOfCover,
                GetStatusName: getStatusName,
                ContainsAdjustmentQuote: containsAdjustmentQuote,
                ContainsRenewalQuote: containsRenewalQuote,
                GetYesNoFromBoolean: getYesNoFromBoolean,
                ValidDate: validDate,
                GetCoverStartDates: getCoverStartDates,
                GetCoverEndDates: getCoverEndDates,
                CalculateDays: calculateDays,
                Get24HourOptions: get24HourOptions,
                GetDayOptions: getDayOptions,
                GetFullMonthOptions: getFullMonthOptions,
                GetRestrictedYearOptions: getRestrictedYearOptions,
                GetCustomYearOptions: getCustomYearOptions,
                GetBirthdayYearOptions: getBirthdayYearOptions,
                TruncateString: truncateString,
                RemoveWhiteSpace: removeWhiteSpace
            };
    
            function getBasket() {
                return $http.get('/basket/getbasket/')
                    .then(getBasketComplete)
                    .catch(function (response) {
                        $log.error(response.status);
                        $log.error(response.statusText);
                        $log.error('XHR failed for GetBasket');
    
                        //$window.location.href = '/error?status=' + response.status;
                    });
    
                function getBasketComplete(data, status, headers, config) {
                    return data.data.Basket;
                }
            }
    
            function saveBasket(data) {
                return $http.post('/basket/savebasket', data)
                    .then(saveBasketComplete)
                    .catch(function (response) {
                        $log.error(response.status);
                        $log.error(response.statusText);
                        $log.error('XHR failed for SaveBasket');
    
                        //$window.location.href = '/error?status=' + response.status;
                    });
    
                function saveBasketComplete(data, status, headers, config) {
                    return data.data;
                }
            }
    
            function updateBasket(data) {
                var url;
    
                if (data.IsAdjustment) {
                    url = '/basket/updateadjustmentbasket';   // ADJUSTMENT WORKFLOW
                } else if (data.IsRenewal) {
                    url = '/basket/updaterenewalbasket';      // RENEWAL WORKFLOW
                } else {
                    url = '/basket/updatebasket';             // NB WORKFLOW
                }
    
                return $http.post(url, data)
                    .then(updateBasketComplete)
                    .catch(function (response) {
                        $log.error(response.status);
                        $log.error(response.statusText);
                        $log.error('XHR failed for UpdateBasket');
                    });
    
                function updateBasketComplete(data, status, headers, config) {
                    return data.data;
                }
            }
    
            function getUserAuthentication() {
                return $http.get('/account/getuserauthentication/')
                    .then(getUserAuthenticationComplete)
                    .catch(function (response) {
                        $log.error(response.status);
                        $log.error(response.statusText);
                        $log.error('XHR failed for GetUserAuthentication');
                    });
    
                function getUserAuthenticationComplete(data, status, headers, config) {
                    return data.data;
                }
            }
    
            function getUserState() {
                return $http.get('/account/getuserstate/' + '?nocache=' + new Date().getTime())
                    .then(getUserStateComplete)
                    .catch(function (response) {
                        $log.error(response.status);
                        $log.error(response.statusText);
                        $log.error('XHR failed for GetUserState');
                    });
    
                function getUserStateComplete(data, status, headers, config) {
                    return data.data;
                }
            }
    
            function getAge(birth) {
                var nowyear = today.getFullYear(),
                    nowmonth = today.getMonth(),
                    nowday = today.getDate(),
                    birthyear = birth.getFullYear(),
                    birthmonth = birth.getMonth(),
                    birthday = birth.getDate(),
                    age = nowyear - birthyear,
                    ageMonth = nowmonth - birthmonth,
                    ageDay = nowday - birthday;
    
                if (ageMonth < 0 || (ageMonth === 0 && ageDay < 0)) {
                    age = parseInt(age, 10) - 1;
                }
    
                return age;
            }
    
            function getAgeAtInception(birth, inceptionDate) {
                var iDate = new Date(inceptionDate),
                    year = iDate.getFullYear(),
                    month = iDate.getMonth(),
                    day = iDate.getDate(),
                    birthyear = birth.getFullYear(),
                    birthmonth = birth.getMonth(),
                    birthday = birth.getDate(),
                    age = year - birthyear,
                    ageMonth = month - birthmonth,
                    ageDay = day - birthday;
    
                if (ageMonth < 0 || (ageMonth === 0 && ageDay < 0)) {
                    age = parseInt(age, 10) - 1;
                }
    
                return age;
            }
    
            function checkCookiesForPromotionalCodes() {
                return $http.get('/account/checkcookieforpromotionalcode/')
                    .then(checkCookiesForPromotionalCodesComplete)
                    .catch(function (message) {
                        $log.error('XHR failed for CheckCookiesForPromotionalCodes');
                    });
    
                function checkCookiesForPromotionalCodesComplete(data, status, headers, config) {
                    return data.data;
                }
            }
    
            function getRegionOfCover(type) {
                switch (parseInt(type, 10)) {
                    case 1:
                        return 'Europe incl. Egypt & Morocco';
                    case 2:
                        return 'Worldwide incl. All Countries';
                    case 3:
                        return 'Worldwide exc. USA, Canada, Caribbean, Mexico & Japan';
                    default:
                        return '';
                }
            }
            
            function getBicycleType(type) {
                switch (parseInt(type, 10)) {
                    case 1:
                        return 'BMX';
                    case 2:
                        return 'Cruiser';
                    case 3:
                        return 'Cyclo-cross';
                    case 4:
                        return 'Dutch / Shopping';
                    case 5:
                        return 'Electric';
                    case 6:
                        return 'Fat';
                    case 7:
                        return 'Fixed Gear';
                    case 8:
                        return 'Folding';
                    case 9:
                        return 'Hand';
                    case 10:
                        return 'Hybrid / Flat Bar / Commuter';
                    case 11:
                        return 'Mountain';
                    case 12:
                        return 'Recumbent';
                    case 13:
                        return 'Road / Racing';
                    case 14:
                        return 'Tandem';
                    case 15:
                        return 'Time Trial / Triathlon';
                    case 16:
                        return 'Touring';
                    case 17:
                        return 'Track';
                    case 18:
                        return 'Cargo / E-cargo';
                    default:
                        return 'Not Specified';
                }
            }
    
            function getBicycleTypeOfCover(id) {
                switch (parseInt(id, 10)) {
                    case 1:
                        return 'Essentials';
                    case 2:
                        return 'Performance';
                    case 3:
                        return 'Ultimate';
                }
            }
    
            function getTravelTypeOfCover(id) {
                switch (parseInt(id, 10)) {
                    case 1:
                        return 'Individual';
                    case 2:
                        return 'Couple';
                    case 3:
                        return 'Family';
                    case 4:
                        return 'Single Parent';
                    case 5:
                        return 'Group';
                }
            }
    
            function getStatusName(id) {
                switch (parseInt(statusIndex, 10)) {
                    case 1:
                    case 10:
                    case 11:
                    case 21:
                        return 'Live';
                    case 16:
                        return 'Renewal Pending';
                    case 3:
                    case 4:
                        return 'Cancelled';
                    case 5:
                        return 'Lapsed';
                    default:
                        return '';
                }
            }
    
            function containsAdjustmentQuote(basket) {
                var bicycleQuoteStatus = 0;
    
                if (angular.isDefined(basket.BicycleQuotes) && basket.BicycleQuotes.length > 0 && angular.isDefined(basket.BicycleQuotes[0].Status)) {
                    bicycleQuoteStatus = basket.BicycleQuotes[0].Status;
                }
    
                var travelQuoteStatus = 0;
    
                if (angular.isDefined(basket.TravelQuotes) && basket.TravelQuotes.length > 0 && angular.isDefined(basket.TravelQuotes[0].Status)) {
                    travelQuoteStatus = basket.TravelQuotes[0].Status;
                }
    
                return (bicycleQuoteStatus === 15 || travelQuoteStatus === 15);
            }
    
            function containsRenewalQuote(basket) {
                var bicycleQuoteStatus = 0;
    
                if (angular.isDefined(basket.BicycleQuotes) && basket.BicycleQuotes.length > 0 && angular.isDefined(basket.BicycleQuotes[0].Status)) {
                    bicycleQuoteStatus = basket.BicycleQuotes[0].Status;
                }
    
                var travelQuoteStatus = 0;
    
                if (angular.isDefined(basket.TravelQuotes) && basket.TravelQuotes.length > 0 && angular.isDefined(basket.TravelQuotes[0].Status)) {
                    travelQuoteStatus = basket.TravelQuotes[0].Status;
                }
    
                return (bicycleQuoteStatus === 28 || travelQuoteStatus === 28);
            }
    
            function getYesNoFromBoolean(bool) {
                return bool ? 'Yes' : 'No';
            }
    
            function validDate(year, month, day) {
                var isLeapYear = false;
    
                // LEAP YEAR CALCULATOR
                if (angular.isDefined(year)) {
                    if (year % 4 !== 0) {
                        isLeapYear = false;
                    } else if (year % 100 !== 0) {
                        isLeapYear = true;
                    } else if (year % 400 !== 0) {
                        isLeapYear = false;
                    } else {
                        isLeapYear = true;
                    }
                }
    
                if (isLeapYear && month === 1) {
                    if (day > 29) { // 29 DAYS IN FEB IN A LEAP YEAR
                        return false;
                    } else {
                        return true;
                    }
                } else if (!isLeapYear && month === 1) {
                    if (day > 28) { // 28 DAYS IN FEB IN A STANDARD YEAR
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    if (day > 30) { // 30 & 31 DAY RULES
                        if (month === 0 ||
                            month === 2 ||
                            month === 4 ||
                            month === 6 ||
                            month === 7 ||
                            month === 9 ||
                            month === 11) {
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        return true;
                    }
                }
            }
    
            function getCoverStartDates(days) {
                var options = [];
    
                for (var i = 0; i <= days; i++) {
                    var optionDate = new Date();
                    optionDate.setHours(0, 0, 0, 0);
                    optionDate.setDate(optionDate.getDate() + i);
    
                    var value = optionDate.toISOString(),
                        name = $filter('date')(optionDate, 'fullDate'),
                        option = { Id: value, Name: name };
    
                    options.push(option);
                }
    
                return options;
            }
    
            function getCoverEndDates(startDate) {
                var options = [];
    
                for (var i = 1; i <= 30; i++) {
                    var optionDate = new Date(startDate);
                    optionDate.setHours(0, 0, 0, 0);
                    optionDate.setDate(optionDate.getDate() + i);
    
                    var value = optionDate.toISOString(),
                        name = $filter('date')(optionDate, 'fullDate'),
                        option = { Id: value, Name: name };
    
                    options.push(option);
                }
    
                return options;
            }
    
            function calculateDays(startDate, endDate) {
                var start = new Date(startDate),
                    end = new Date(endDate),
                    timeDiff = Math.abs(start.getTime() - end.getTime());
    
                return Math.ceil(timeDiff / (1000 * 3600 * 24));
            }
    
            function get24HourOptions() {
                var options = [];
    
                for (var i = 0; i <= 23; i++) {
                    var value = i,
                        name = padLeft(i, 2).toString() + ':00',
                        option = { id: value, name: name };
    
                    options.push(option);
                }
    
                return options;
            }
    
            function getDayOptions() {
                var options = [];
    
                for (var x = 1; x <= 31; x++) {
                    var value = String(x).replace(/\b(\d{1})\b/g, '0$1');
                    options.push({ id: x, name: value });
                }
    
                return options;
            }
    
            function getFullMonthOptions() {
                return [
                    { id: '0', name: 'January' },
                    { id: '1', name: 'February' },
                    { id: '2', name: 'March' },
                    { id: '3', name: 'April' },
                    { id: '4', name: 'May' },
                    { id: '5', name: 'June' },
                    { id: '6', name: 'July' },
                    { id: '7', name: 'August' },
                    { id: '8', name: 'September' },
                    { id: '9', name: 'October' },
                    { id: '10', name: 'November' },
                    { id: '11', name: 'December' }
                ];
            }
    
            function getRestrictedYearOptions() {
                var today = new Date(),
                    previousYear = today.getFullYear() - 1,
                    currentYear = today.getFullYear(),
                    years = [];
    
                for (var x = previousYear; x <= currentYear; x++) {
                    years.push({ id: x, name: x });
                }
    
                return years;
            }
    
            function getCustomYearOptions(numberOfYears) {
                var today = new Date(),
                    currentYear = today.getFullYear(),
                    maxYear = new Date(today.setFullYear(today.getFullYear() + numberOfYears)).getFullYear(),
                    years = [];
    
                for (var x = currentYear; x <= maxYear; x++) {
                    years.push({ Id: x, Name: x });
                }
    
                return years;
            }
    
            function getBirthdayYearOptions(minAge, maxAge) {
                var today = new Date(),
                    currentYear = today.getFullYear(),
                    minYear = new Date(today.setFullYear(today.getFullYear() - maxAge)).getFullYear(),
                    years = [];
    
                for (var x = (currentYear - minAge); x >= minYear; x--) {
                    years.push({ id: x, name: x });
                }
    
                return years;
            }
    
            function truncateString(string, count) {
                if (string.length > count) {
                    string = string.substring(0, count);
                    return string + '...';
                } else {
                    return string;
                }
            }
    
            function removeWhiteSpace(string) {
                if (string.length > 0) {
                    string = string.replace(/[\s]/g, '');
                }
    
                return string;
            }
    }

})();
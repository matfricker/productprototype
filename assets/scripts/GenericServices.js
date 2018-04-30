module.factory('GenericServices', ['$http', '$filter', function ($http, $filter) {
    return {
        GetUserAuthentication: function () {
            return $http.get('/account/getuserauthentication/' + '?nocache=' + new Date().getTime()).
                then(function successCallback(response) {
                    return response.data;
                }, function errorCallback() {
                    return false;
                });
        },
        GetUserState: function () {
            return $http.get('/account/getuserstate/' + '?nocache=' + new Date().getTime()).
                then(function (response) {
                    return response.data;
                });
        },
        GetAge: function (birth) {
            var nowyear = today.getFullYear();
            var nowmonth = today.getMonth();
            var nowday = today.getDate();
            var birthyear = birth.getFullYear();
            var birthmonth = birth.getMonth();
            var birthday = birth.getDate();
            var age = nowyear - birthyear;
            var age_month = nowmonth - birthmonth;
            var age_day = nowday - birthday;

            if (age_month < 0 || (age_month === 0 && age_day < 0)) {
                age = parseInt(age, 10) - 1;
            }

            return age;
        },
        GetAgeAtInception: function (birth, inceptionDate) {
            var iDate = new Date(inceptionDate);
            var year = iDate.getFullYear();
            var month = iDate.getMonth();
            var day = iDate.getDate();
            var birthyear = birth.getFullYear();
            var birthmonth = birth.getMonth();
            var birthday = birth.getDate();
            var age = year - birthyear;
            var age_month = month - birthmonth;
            var age_day = day - birthday;

            if (age_month < 0 || (age_month === 0 && age_day < 0)) {
                age = parseInt(age, 10) - 1;
            }

            return age;
        },
        GetRegionOfCover: function (type) {
            switch (parseInt(type, 10)) {
                case 1:
                    return "Europe";
                case 2:
                    return "Worldwide (Inc USA & Canada)";
                default:
                    return "";
            }
        },
        GetTypeOfCover: function (type) {
            switch (parseInt(type, 10)) {
                case 1:
                    return "Individual";
                case 2:
                    return "Couple";
                case 3:
                    return "Family";
                default:
                    return "";
            }
        },
        GetBicycleType: function (type) {
            switch (parseInt(type, 10)) {
                case 1:
                    return "BMX";
                case 2:
                    return "Cruiser";
                case 3:
                    return "Cyclo-cross";
                case 4:
                    return "Dutch / Shopping";
                case 5:
                    return "Electric";
                case 6:
                    return "Fat";
                case 7:
                    return "Fixed Gear";
                case 8:
                    return "Folding";
                case 9:
                    return "Hand";
                case 10:
                    return "Hybrid / Flat Bar / Commuter";
                case 11:
                    return "Mountain";
                case 12:
                    return "Recumbent";
                case 13:
                    return "Road / Racing";
                case 14:
                    return "Tandem";
                case 15:
                    return "Time Trial / Triathlon";
                case 16:
                    return "Touring";
                case 17:
                    return "Track";
                default:
                    return "Not Specified";
            }
        },
        GetBicycleTypeOfCover: function (id) {
            switch (parseInt(id, 10)) {
                case 1:
                    return "Essentials";
                case 2:
                    return "Performance";
                case 3:
                    return "Ultimate";
            }
        },
        GetStatusName: function (id) {
            switch (parseInt(statusIndex, 10)) {
                case 1:
                case 10:
                case 11:
                case 21:
                    return "Live";
                case 16:
                    return "Renewal Pending";
                case 3:
                case 4:
                    return "Cancelled";
                case 5:
                    return "Lapsed";
                default:
                    return "";
            }
        },
        ContainsAdjustmentQuote: function (basket) {
            var bicycleQuoteStatus = 0;
            if (basket.BicycleQuotes !== 'undefined' && basket.BicycleQuotes.length > 0 && basket.BicycleQuotes[0].Status !== 'undefined') {
                bicycleQuoteStatus = basket.BicycleQuotes[0].Status;
            }

            var travelQuoteStatus = 0;
            if (basket.TravelQuotes !== 'undefined' && basket.TravelQuotes.length > 0 && basket.TravelQuotes[0].Status !== 'undefined') {
                travelQuoteStatus = basket.TravelQuotes[0].Status;
            }

            return (bicycleQuoteStatus === 15 || travelQuoteStatus === 15);
        },
        ContainsRenewalQuote: function (basket) {
            var bicycleQuoteStatus = 0;
            if (basket.BicycleQuotes !== 'undefined' && basket.BicycleQuotes.length > 0 && basket.BicycleQuotes[0].Status !== 'undefined') {
                bicycleQuoteStatus = basket.BicycleQuotes[0].Status;
            }

            var travelQuoteStatus = 0;
            if (basket.TravelQuotes !== 'undefined' && basket.TravelQuotes.length > 0 && basket.TravelQuotes[0].Status !== 'undefined') {
                travelQuoteStatus = basket.TravelQuotes[0].Status;
            }
            return (bicycleQuoteStatus === 28 || travelQuoteStatus === 28);
        },
        GetYesNoFromBoolean: function (b) {
            return b ? "Yes" : "No";
        },
        ValidDate: function (year, month, day) {
            var isLeapYear = false;
            year = parseInt(year, 10);
            month = parseInt(month, 10);
            day = parseInt(day, 10);
            // LEAP YEAR CALCULATOR
            if (typeof (year) !== 'undefined') {
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
        },
        GetCoverStartDates: function () {
            var options = [];
            for (var i = 0; i <= 60; i++) {
                var optionDate = new Date();
                if (i > 0) {
                    optionDate.setHours(0, 0, 0, 0);
                }
                optionDate.setDate(optionDate.getDate() + i);

                var value = optionDate.toISOString();
                var name = $filter('date')(optionDate, 'fullDate');

                var option = {
                    Id: value,
                    Name: name
                };

                options.push(option);
            }
            return options;
        },
        Get24HourOptions: function () {
            var options = [];
            for (var i = 0; i <= 23; i++) {
                var value = i;
                var name = padLeft(i, 2).toString() + ":00";
                var option = {
                    id: value,
                    name: name
                };

                options.push(option);
            }
            return options;
        },
        DayOptions: function () {
            var options = [];
            for (var x = 1; x <= 31; x++) {
                var value = String(x).replace(/\b(\d{1})\b/g, '0$1');
                options.push({ id: x, name: value });
            }
            return options;
        },
        FullMonthOptions: function () {
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
        },
        PaymentMonthDropdown: function () {
            return [
                { id: '01', name: 'January (01)' },
                { id: '02', name: 'February (02)' },
                { id: '03', name: 'March (03)' },
                { id: '04', name: 'April (04)' },
                { id: '05', name: 'May (05)' },
                { id: '06', name: 'June (06)' },
                { id: '07', name: 'July (07)' },
                { id: '08', name: 'August (08)' },
                { id: '09', name: 'September (09)' },
                { id: '10', name: 'October (10)' },
                { id: '11', name: 'November (11)' },
                { id: '12', name: 'December (12)' }
            ];
        },
        RestrictedYearOptions: function () {
            var today = new Date();
            var previousYear = today.getFullYear() - 1;
            var currentYear = today.getFullYear();
            var years = [];
            for (x = previousYear; x <= currentYear; x++) {
                years.push({ id: x, name: x });
            }
            return years;
        },
        CustomYearOptions: function (numberOfYears) {
            var today = new Date();
            var currentYear = today.getFullYear();
            var maxYear = new Date(today.setFullYear(today.getFullYear() + numberOfYears)).getFullYear();
            var years = [];
            for (x = currentYear; x <= maxYear; x++) {
                years.push({ id: x, name: x });
            }
            return years;
        },
        SaveBasket: function (data, callback) {
            $http.post("/basket/savebasket", data).
                then(function successCallback(response) {
                    callback(response);
                }, function errorCallback(response) {
                    callback(response);
                });
        },
        TruncateString: function (string, count) {
            if (string.length > count) {
                string = string.substring(0, count);
                return string + "...";
            } else {
                return string;
            }
        },
        RemoveWhiteSpace: function (string) {
            if (string.length > 0) {
                string = string.replace(/[\s]/g, '');
            }
            return string;
        },
    };
}]);
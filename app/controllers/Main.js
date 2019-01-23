(function() {
    'use strict';

    angular
        .module('app')
        .controller('Main', Main);
        
        Main.$inject = ['$scope'];
        
        function Main($scope) {
            $scope.debugging = true;
            $scope.Message = '[AngularJS]';
            console.log($scope.Message);
        };

})();
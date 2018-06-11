(function() {
    'use strict';

    angular
        .module('app')
        .controller('MainController', ['$scope', function($scope) {
            $scope.debugging = true;
            $scope.Message = '[AngularJS]';
            console.log($scope.Message);
        }]);

})();
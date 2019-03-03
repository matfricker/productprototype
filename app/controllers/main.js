(function() {
    'use strict';

    angular
        .module('app')
        .controller('Main', Main);
        
        Main.$inject = ['$scope'];
        
        function Main($scope) {
            $scope.Message = 'Home sweet home..';
            $scope.debugging = true;
        };

})();

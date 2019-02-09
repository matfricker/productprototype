(function() {
    'use strict';

    angular
        .module('app')
        .controller('Main', Main);
        
        Main.$inject = ['$scope'];
        
        function Main($scope) {
            $scope.debugging = true;
        };

})();

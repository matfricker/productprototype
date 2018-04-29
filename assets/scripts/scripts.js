var app = angular.module('app', []);

app.controller('MainController', ['$scope', function($scope) {
    $scope.message = 'Hello Matt!';
    console.log($scope.message);
}]);
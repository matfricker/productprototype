module.controller('MainController', ['$scope', function($scope) {
    $scope.debugging = true;
    
    $scope.message = 'Hello Matt!';
    console.log($scope.message);
}]);
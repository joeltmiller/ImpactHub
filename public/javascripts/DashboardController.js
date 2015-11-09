/**
 * Created by davidhoverson on 11/6/15.
 */
var app = angular.module('dashboard', []);

app.controller('DashboardController', ['$scope', '$http', function($scope, $http) {

    $scope.message = "Dashboard Controller is Working";

}]);

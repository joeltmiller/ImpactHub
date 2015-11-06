/**
 * Created by m3rkz0r on 11/3/15.
 */
var myApp = angular.module('myApp', []);

myApp.controller('MainController', ['$scope','$http', function($scope, $http) {

    $scope.jsonData = [];

    $http.get('/data').then(function(res){
        $scope.jsonData = res.data;
    });




}]);
/**
 * Created by davidhoverson on 11/6/15.
 */

var app = angular.module('dashboard', []);

app.controller('DashboardController', ['$scope', '$http', function($scope, $http) {


        $http({
            method:'JSONP',
            url:"https://api.thedatabank.com/v1.0/login.asp?username=IMHSP_API&password=p8nRDaD2X0wc"
        }).then(function(response) {
            console.log("Auth url and response.data", response.data);
        }, function errorCallBack(response){

            console.log("Login error", response);
        });

        $http({
            method: 'JSONP',
            url:"https://api.thedatabank.com/v1.0/secure/SearchMembers.asp?lastname=bailey&callback=JSON_CALLBACK"
        }).then(function(response){
            console.log("Query from dashboard", response.data);

        }, function errorCallBack(response){

            console.log("Search Member dashboard", response);

        });
    $scope.message = "Dashboard Controller is Working";

}]);

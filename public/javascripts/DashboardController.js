/**
 * Created by davidhoverson on 11/6/15.
 */

var app = angular.module('dashboard', []);

app.controller('DashboardController', ['$scope', '$http', function($scope, $http) {


        $http({
            method:'JSONP',
            url:"https://api.thedatabank.com/v1.0/login.asp?username=IMHSP_API&password=p8nRDaD2X0wc"
        }).then(function(body){
            console.log(body);
        });

        $http({
            method: 'JSONP',
            url:"https://api.thedatabank.com/v1.0/secure/SearchMembers.asp?lastname=bailey"
        }).then(function(response){
            console.log(response.data);

        }, function errorCallBack(response){

            console.log(response);

        });
    $scope.message = "Dashboard Controller is Working";

}]);

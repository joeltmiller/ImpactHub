/**
 * Created by m3rkz0r on 11/17/15.
 */
app.controller('WhosHereController', ['$scope', '$http', function($scope, $http) {

    $scope.getUsers = [];

    $http.get('/perDay').then(function(req){
       $scope.getUsers = req.data;
        console.log(req.data);
    });

}]);
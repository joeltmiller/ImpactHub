/**
 * Created by JacobSchoolmeesters on 11/17/15.
 */
/**
 * Created by m3rkz0r on 11/17/15.
 */
app.controller('WhosHereController', ['$scope', '$http', function($scope, $http) {

    $scope.getGuest = [];
    $scope.getMember = [];

    $http.get('/guestsPerDay').then(function(req){
       $scope.getGuest = req.data;
    });

    $http.get('/membersPerDay').then(function(req){
        $scope.getMember = req.data;
    });

}]);
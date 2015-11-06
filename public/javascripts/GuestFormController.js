/**
 * Created by davidhoverson on 11/6/15.
 */
app.controller('GuestFormController', ['$scope', '$http', function($scope, $http) {

    $scope.jsonData = [];

    $http.get('/data').then(function(res){
        $scope.jsonData = res.data;
    });

    $scope.checkedValue = function(){
        return parseInt(1);
    };

    $scope.message = "Guest Controller is working";

}]);


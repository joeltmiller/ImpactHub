/**
 * Created by davidhoverson on 11/6/15.
 */
app.controller('HomeController', ['$scope', function($scope) {

    $scope.message = "Home Controller is Working";

    var d= new Date();
    var test = d.getMonth()+1;
    console.log(test);
}]);
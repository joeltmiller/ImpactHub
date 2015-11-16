/**
 * Created by davidhoverson on 11/6/15.
 */
app.controller('ThankYouController', ['$scope', '$timeout', '$location', function($scope,$timeout,$location) {

    $scope.message = "Thank You Controller is Working";

    //Changes the thanks page to index after 3 seconds.
    $timeout(function() {
        $location.path("/index")
    }, 5000);

}]);
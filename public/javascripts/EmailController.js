app.controller('EmailController', ['$scope', '$http', function($scope, $http) {
    $scope.message = "Email Controller is working!";

    $http.get('/guestEmails').then(function(res){
        $scope.emails = res.data;
    });

    $scope.member = function(value) {
        if(value == 1){
            return "Yes"
        } else {
            return "No"
        }
    }
}]);

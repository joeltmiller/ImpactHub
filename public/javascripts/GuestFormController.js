app.controller('GuestFormController', ['$scope', '$http', '$location', function($scope, $http, $location) {

    $scope.jsonData = [];

    $scope.postData = [];

    $scope.checkboxEmail = true;

    $scope.checkboxMember = true;

    $scope.checkboxEvent = false;




    $scope.formData = function(){
        $scope.postData = {
             name: $scope.name,
             email: $scope.email,
             meeting: $scope.meeting,
             twitter: $scope.twitter,
             company: $scope.company,
             membership: $scope.checkboxMember,
             email_opt_in: $scope.checkboxEmail,
             event: $scope.checkboxEvent
         };

        $http.post('/guest', $scope.postData).then(function(response){
            $location.path(response.data.route);
        });

    };






    $http.get('/data').then(function(res){
        $scope.jsonData = res.data;
    });

    $scope.checkedValue = function(){
        return parseInt(1);
    };

    $scope.message = "Guest Controller is working";

}]);


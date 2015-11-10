/**
 * Created by davidhoverson on 11/6/15.
 */
app.controller('GuestFormController', ['$scope', '$http', '$location', function($scope, $http, $location) {

    $scope.jsonData = [];

    $scope.postData = [];




    $scope.formData = function(){
        $scope.postData = {
             name: $scope.name,
             email: $scope.email,
             meeting: $scope.meeting,
             twitter: $scope.twitter,
             company: $scope.company,
             membership: $scope.checkboxMember,
             email_opt_in: $scope.checkboxEmail


         };
        console.log($scope.postData);

        $http.post('/guest', $scope.postData).then(function(response){

            console.log('Response', response.data);

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


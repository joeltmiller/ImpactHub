app.controller('SigninController', ['$scope', function($scope) {

    $scope.message = "Sign-in Controller is Working";
    $scope.memberID = '';

    $scope.keypadPress = function(value){
        console.log('pressing a button that is ', value);
        $scope.memberID +=  value;
    };

    $scope.submitCode = function(){

        if($scope.memberID.length == 4) {
            var code = parseInt($scope.memberID);
            console.log('this should be an int: ', code);
        } else {
            alert("invalid code");
            $scope.memberID = '';
        }
    }


}]);
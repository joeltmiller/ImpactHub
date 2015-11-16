app.controller('SigninController', ['$scope', '$http', '$location', function($scope, $http, $location) {

    $scope.message = "Sign-in Controller is Working";
    $scope.memberID = '';
    $scope.memberSuccess = '';

    $http({
        method:'JSONP',
        url:"https://api.thedatabank.com/v1.0/login.asp?username=IMHSP_API&password=p8nRDaD2X0wc"
    }).then(function(response) {
        console.log("Auth url and response.data", response.data);
    }, function errorCallBack(response){

        console.log("Login error", response);
    });



    $scope.keypadPress = function(value){
        console.log('pressing a button that is ', value);
        $scope.memberID +=  value;
    };

    $scope.submitCode = function(){

        if($scope.memberID.length == 4) {
            var code = parseInt($scope.memberID);
            console.log('this should be an int: ', code);

            $http({
                method: 'JSONP',
                url:"https://api.thedatabank.com/v1.0/secure/SearchMembers.asp?MemberID=" + $scope.memberID + "&callback=JSON_CALLBACK"
            }).then(function(response){
                console.log("Query from dashboard", response.data);
                var memberVerify = response.data;
                if(memberVerify.Result == "Success"){
                    console.log("Hello, ", memberVerify.Members[0].FullName1);
                    $scope.memberSuccess = memberVerify.Members[0].FullName1;
                    $location.path("/thanks");
                }

            }, function errorCallBack(response){

                console.log("Search Member dashboard", response);

            });





        } else {
            alert("invalid code");
            $scope.memberID = '';
        }
    }


}]);
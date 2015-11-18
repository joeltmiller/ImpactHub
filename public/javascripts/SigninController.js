app.controller('SigninController', ['$scope', '$http', '$location', function($scope, $http, $location) {

    $scope.message = "Sign-in Controller is Working";
    $scope.memberID = '';
    $scope.memberSuccess = '';

    //Variables to show password circles as entered
    $scope.passwordOne = false;
    $scope.passwordTwo = false;
    $scope.passwordThree = false;
    $scope.passwordFour = false;





    $http({
        method:'JSONP',
        url:"https://api.thedatabank.com/v1.0/login.asp?username=&password="
    }).then(function(response) {
        console.log("Auth url and response.data", response.data);
    }, function errorCallBack(response){

        console.log("Login error", response);
    });



    $scope.keypadPress = function(value){
        console.log('pressing a button that is ', value);
        $scope.memberID +=  value;


        //Shows password circles on keypad
        switch ($scope.memberID.length){
            case 1:
                $scope.passwordOne = true;
                break;
            case 2:
                $scope.passwordTwo = true;
                break;
            case 3:
                $scope.passwordThree = true;
                break;
            case 4:
                $scope.passwordFour = true;
                break;
            case 5:
                alert('You have entered too many digits');
                break;
            default:
                $scope.passwordOne = false;
                $scope.passwordTwo = false;
                $scope.passwordThree = false;
                $scope.passwordFour = false;

        }

    };

    //Deleting numbers on password field.
    $scope.passwordDelete = function(){

        var tempCode = $scope.memberID.slice(0, -1);
        $scope.memberID = tempCode;
        console.log($scope.memberID);


        //Shows password circles on keypad
        switch ($scope.memberID.length){
            case 0:
                $scope.passwordOne = false;
                break;
            case 1:
                $scope.passwordTwo = false;
                break;
            case 2:
                $scope.passwordThree = false;
                break;
            case 3:
                $scope.passwordFour = false;
                break;
            case -1:
                alert('Please enter code');
                break;
            default:
                $scope.passwordOne = false;
                $scope.passwordTwo = false;
                $scope.passwordThree = false;
                $scope.passwordFour = false;

        }




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
                }else{
                    alert("member not found");
                    $scope.memberID = '';
                }

            }, function errorCallBack(response){

                console.log("Search Member dashboard", response);

            });





        }
        else {
            alert("invalid code");
            $scope.memberID = '';
        }
    }


}]);
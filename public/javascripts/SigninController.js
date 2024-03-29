app.controller('SigninController', ['$scope', '$http', '$location', '$window', function($scope, $http, $location, $window) {

    $scope.message = "Sign-in Controller is Working";
    $scope.memberID = '';
    $scope.memberSuccess = '';

    //Variables to show password circles as entered
    $scope.passwordOne = false;
    $scope.passwordTwo = false;
    $scope.passwordThree = false;
    $scope.passwordFour = false;
    $scope.memberVerify = [];


    $scope.keypadPress = function(value){
        console.log('pressing a button that is ', value);

        if($scope.memberID.length < 5) {
            $scope.memberID += value;


            //Shows password circles on keypad
            switch ($scope.memberID.length) {
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
                    $scope.memberID = '';
                    $scope.passwordOne = false;
                    $scope.passwordTwo = false;
                    $scope.passwordThree = false;
                    $scope.passwordFour = false;
                    break;
                default:
                    $scope.passwordOne = false;
                    $scope.passwordTwo = false;
                    $scope.passwordThree = false;
                    $scope.passwordFour = false;

            }
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


        if($scope.memberID === '7170'){
            $window.location.href = '/admin';

        }else if($scope.memberID === '1234'){
            $window.location.href = '/admin';

        }else if($scope.memberID.length == 4) {
            var code = {'member':parseInt($scope.memberID)};
            console.log('this should be an int: ', code);



            $http({
                method: 'GET',
                url:"/memberverify",
                params: {'member' : $scope.memberID}
            }).then(function(response){
                $scope.memberVerify = angular.fromJson(response.data);
                console.log("this is member info: ", $scope.memberVerify);
                $scope.checkMemberStatus();





            }, function errorCallBack(response){

                console.log("Search Member dashboard", response);

            });





            }
            else {
            swal({
                title: 'Oops!',
                text: 'Invalid Code',
                //type: 'error',
                confirmButtonColor: '#802926',
                imageUrl: '/assets/RedMinneStPaulDG.png',
                imageSize: '400x79'
                //width: 000,
                //padding: 100,
                //background: 'url(http:........)'
            });
                $scope.memberID = '';
                $scope.passwordOne = false;
                $scope.passwordTwo = false;
                $scope.passwordThree = false;
                $scope.passwordFour = false;
            }
    };

    $scope.checkMemberStatus = function(){
        if($scope.memberVerify.Result == "Success"){
            //console.log("Hello, ", $scope.memberVerify.Members[0].FullName1);
            $scope.memberSuccess = {
                name: $scope.memberVerify.Members[0].FullName1,
                email: $scope.memberVerify.Members[0].Email,
                company: $scope.memberVerify.Members[0].Company
            };

            //console.log($scope.memberSuccess);

            //Posting a successfully verified member to the local database.
            $http.post('/member', $scope.memberSuccess);

            $location.path("/whoshere");
        }else{
            swal({
                title: 'Oops!',
                text: 'Member Not Found',
                //type: 'error',
                confirmButtonColor: '#802926',
                imageUrl: '/assets/RedMinneStPaulDG.png',
                imageSize: '400x79'
                //width: 000,
                //padding: 100,
                //background: 'url(http:........)'
            });
            $scope.memberID = '';
            $scope.passwordOne = false;
            $scope.passwordTwo = false;
            $scope.passwordThree = false;
            $scope.passwordFour = false;
        }
    }

}]);
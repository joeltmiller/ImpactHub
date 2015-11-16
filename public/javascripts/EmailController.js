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
    };

    var headings = ["Timestamp", "Name", "Member", "Meeting with", "Email", "Twitter Handle", "Interested in Membership"];


    $http.get('/data').then(function(res){


        $scope.getSignIn = function(){
            var signIns = [];

            var data = [];

            $scope.calledData = res.data;

            for(var i = 0; i < $scope.calledData.length; i++){

                var dataObj = {};

                for(var j = 0; j < $scope.calledData[i].length; j++){
                    dataObj.push($scope.calledData[i].temp_time, $scope.calledData[i].name, $scope.calledData[i].member, $scope.calledData[i].meeting_with, $scope.calledData[i].email, $scope.calledData[i].twitter)
                    if($scope.calledData[i].email_me == 0){
                        dataObj.push("No");
                    } else {
                        dataObj.push("Yes");
                    }
                }
            data.push(dataObj);
            }
            console.log(data);
            return data;
        }
    });


    $scope.getArray = function() {

        //var data = [];
        //
        //
        //for(var i = 0; i < $scope.emails.length; i++){
        //
        //    var dataObj = {};
        //
        //    for(var j = 0; j < $scope.emails[i].length; j++){
        //        dataObj.push($scope.emails[i][j])
        //    }
        //data.push(dataObj);
        //}
        //console.log(data);
        //return data;
        return $scope.emails;

    }

    $scope.getHeader = function() {
        return headings;
    }

    $scope.clickFn = function () {
        console.log("button clicked");
    }


}]);

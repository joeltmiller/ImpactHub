app.controller('EmailController', ['$scope', '$http', function($scope, $http) {
    $scope.message = "Email Controller is working!";

    $scope.emails = [];

    $http.get('/guestEmails').then(function(res){
        $scope.emails = res.data;
    });

    //Sorting function and variables to sort the guest email list
    $scope.predicate = '';
    $scope.reverse = true;
    $scope.order = function(predicate) {
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
        $scope.predicate = predicate;
    };

    //Separate sorting function for the interested in membership column due to reverse logic
    $scope.orderMember = function(predicate) {
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : true;
        $scope.predicate = predicate;
    };

    $scope.member = function(value) {
        if(value == 1){
            return "Yes"
        } else {
            return "No"
        }
    };

    var headings = ["Timestamp", "Name", "Member", "Meeting with", "Email", "Twitter Handle", "Email List", "Interested in Membership"];


    $http.get('/data').then(function(res){


        $scope.getSignIn = function(){
            var signIns = [];

            var data = [];

            $scope.calledData = res.data;

            for(var i = 0; i < $scope.calledData.length; i++){

                var dataObj = [];

                console.log("selected object", $scope.calledData[i]);

                console.log("Called Data length: ", $scope.calledData.length);

                console.log("Called Object length: ", $scope.calledData[i].length);

                dataObj.push($scope.calledData[i].temp_time, $scope.calledData[i].name, $scope.calledData[i].member, $scope.calledData[i].meeting_with, $scope.calledData[i].email, $scope.calledData[i].twitter);
                if($scope.calledData[i].email_me == 0){
                    dataObj.push("No");
                } else {
                    dataObj.push("Yes");
                }
                if($scope.calledData[i].membership == 0){
                    dataObj.push("No");
                } else {
                    dataObj.push("Yes");
                }

            data.push(dataObj);
            }
            console.log($scope.calledData);
            return data;
        }
    });

    //sort email list by interested in membership
    $scope.sortInterested = function(){
        console.log('clicking the interested button');
        //for(var i = 0; i < $scope.emails.length; i++){
        //    console.log('looping');
        //    if($scope.emails[i].membership = 1){
        //       var sorting =  $scope.emails.splice(i, 1);
        //        $scope.emails.unshift(sorting);
        //        i--
        //    }
        //
        //}
        console.log($scope.emails)
    };


    $scope.getArray = function() {

        return $scope.emails;

    };

    $scope.getHeader = function() {
        return headings;
    };

    $scope.clickFn = function () {
        console.log("button clicked");
    }


}]);

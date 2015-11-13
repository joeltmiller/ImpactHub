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

    var headings = ["Timestamp", "Name", "Email", "Interested in Membership"];

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

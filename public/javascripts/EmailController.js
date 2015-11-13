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

    function getArray($scope.emails){
        var headings = ["Timestamp", "Name", "Email", "Interested in Membership"];

        var data = [];


        for(var i = 0; i < $scope.emails.length; i++){
            var newRow = {};

            for(var j = 0; j < $scope.emails.length; j++){
                newRow[headings[j]] = isNaN($scope.emails[i][headings[j]])?'"' + $scope.emails[i][headings[j]] + '"' : $scope.emails[i][headings[j]];
            }
        data.push(newRow);
        }
        console.log(data);
        return data;


    }


}]);

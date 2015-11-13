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

    };

    $scope.getHeader = function() {
        return headings;
    };

    $scope.clickFn = function () {
        console.log("button clicked");
    }


}]);

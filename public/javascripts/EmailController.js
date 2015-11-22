var app = angular.module('email', ['ngSanitize', 'ngCsv']);

app.controller('EmailController', ['$scope', '$http', '$window', function($scope, $http, $window) {
    $scope.message = "Email Controller is working!";

    $scope.navClass = 'big';
    angular.element($window).bind(
        "scroll", function() {
            //console.log(window.pageYOffset);
            if(window.pageYOffset > 0) {
                $scope.navClass = 'small';
            } else {
                $scope.navClass = 'big';
            }
            $scope.$apply();
        });

    $scope.data = [];

    $scope.dataPt2 = [];

    $scope.dataPt3 = [];

    $scope.dataPt4 = [];

    $scope.emails = [];

    $scope.isEmpty = false;

    $http.get('/guestEmails').then(function(res){
        $scope.emails = res.data;
    });

    $scope.dateOptions = [
        {
            val: 'week',
            txt: '1 week'
        },
        {
            val: 'month',
            txt: '1 month'
        },
        {
            val: 'sixMonths',
            txt: '6 months'
        },
        {
            val: 'all',
            txt: 'All'
        }
    ];

    $scope.memberOptions = [
        {
            val: 'members',
            txt: 'Members'
        },
        {
            val: 'guests',
            txt: 'Guests'
        },
        {
            val: 'all',
            txt: 'All'
        }
    ];

    $scope.emailOptions = [
        {
            val: 'yes',
            txt: 'Yes'
        },
        {
            val: 'no',
            txt: 'No'
        },
        {
            val: 'all',
            txt: 'All'
        }
    ];

    $scope.membershipInterOptions = [
        {
            val: 'yes',
            txt: 'Yes'
        },
        {
            val: 'no',
            txt: 'No'
        },
        {
            val: 'all',
            txt: 'All'
        }
    ];



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


    var i = 0;

    var clearTable = function(){
        $http.get('/data').then(function(res){
            $scope.calledData = res.data;
        });

        $scope.data = [];

        $scope.dataPt2 = [];

        $scope.dataPt3 = [];

        $scope.dataPt4 = [];
    };

        $scope.getFullObj = function() {
            clearTable();

            $http.get('/data').then(function(res){

                $scope.calledData = res.data;

                var pushToObj = function(data){
                    $scope.dataObj.push(data.temp_time, data.name, data.member, data.meeting_with, data.email, data.twitter);
                    getEmailList(data.email_me);
                    getIntMember(data.membership);
                    return $scope.dataObj;
                };

                var futurePush = function(data){
                    $scope.dataObj.push(data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7]);
                    return $scope.dataObj;
                };

                var getEmailList = function(emailMe){
                    if(emailMe == 0){
                        $scope.dataObj.push("No");
                    } else {
                        $scope.dataObj.push("Yes");
                    }
                };

                var getIntMember = function(membership){
                    if(membership == 0){
                        $scope.dataObj.push("No");
                    } else {
                        $scope.dataObj.push("Yes");
                    }
                };

                $scope.getDateObj = function() {
                    for(var i = 0; i < $scope.calledData.length; i++){

                        $scope.dataObj = [];

                        var getDateRange = function(date) {

                            var weekAgo = (Date.today().setTimeToNow().add({days:-8})).toString('yyyy-MM-ddTHH:mm:ssZ');

                            var monthAgo = (Date.today().setTimeToNow().add({months:-1})).toString('yyyy-MM-ddTHH:mm:ssZ');

                            var sixMonthsAgo = (Date.today().setTimeToNow().add({months:-6})).toString('yyyy-MM-ddTHH:mm:ssZ');

                            if($scope.timeselect == "week"){
                                if(date > weekAgo){
                                    pushToObj($scope.calledData[i]);
                                }
                            } else if ($scope.timeselect == "month"){
                                if(date > monthAgo){
                                    pushToObj($scope.calledData[i]);
                                }
                            } else if ($scope.timeselect == "sixMonths"){
                                if(date > sixMonthsAgo){
                                    pushToObj($scope.calledData[i]);
                                }
                            } else {
                                pushToObj($scope.calledData[i]);
                            }
                            return $scope.dataObj;
                        };

                        getDateRange($scope.calledData[i].temp_time);



                        if($scope.dataObj.length != 0){
                            console.log("pushed dated object", $scope.dataObj);
                            $scope.data.push($scope.dataObj);
                        }
                    }
                    return $scope.data;
                };

                $scope.getMemberObj = function() {
                    for(var j = 0; j < $scope.data.length; j++){
                        $scope.dataObj = [];

                        $scope.getMemberType = function() {
                            if($scope.typeselect == "members"){
                                console.log("$scope.data[j][2]", $scope.data[j][2])
                                if($scope.data[j][2] == "Yes, I'm a Member"){
                                    futurePush($scope.data[j]);
                                }
                            } else if ($scope.typeselect == "guests"){
                                if($scope.data[j][2] == "No, I'm a Guest"){
                                    futurePush($scope.data[j]);
                                }
                            } else {
                                futurePush($scope.data[j]);
                            }
                        };

                        $scope.getMemberType();

                        if($scope.dataObj.length != 0){
                            console.log("pushed member object", $scope.dataObj);
                            $scope.dataPt2.push($scope.dataObj);
                        }
                    }
                    return $scope.dataPt2;
                };

                $scope.getEmailObj = function(){
                    for(var k = 0; k < $scope.dataPt2.length; k++){
                        $scope.dataObj = [];

                        $scope.getEmailType = function() {
                            if($scope.emailselect == "yes"){
                                if($scope.dataPt2[k][6] == "Yes"){
                                    futurePush($scope.dataPt2[k]);
                                }
                            } else if ($scope.emailselect == "no"){
                                if($scope.dataPt2[k][6] == "No,"){
                                    futurePush($scope.dataPt2[k]);
                                }
                            } else {
                                futurePush($scope.dataPt2[k]);
                            }
                        };

                        $scope.getEmailType();

                        if($scope.dataObj.length != 0){
                            console.log("pushed email object", $scope.dataObj);
                            $scope.dataPt3.push($scope.dataObj);
                        }
                    }
                    return $scope.dataPt3;
                };

                $scope.getMembershipObj = function(){
                    for(var l = 0; l < $scope.dataPt3.length; l++){
                        $scope.dataObj = [];

                        $scope.getEmailType = function() {
                            if($scope.memberselect == "yes"){
                                if($scope.dataPt3[l][7] == "Yes"){
                                    futurePush($scope.dataPt3[l]);
                                }
                            } else if ($scope.memberselect == "no"){
                                if($scope.dataPt3[l][7] == "No"){
                                    futurePush($scope.dataPt3[l]);
                                }
                            } else {
                                futurePush($scope.dataPt3[l]);
                            }
                        };

                        $scope.getEmailType();

                        if($scope.dataObj.length != 0){
                            console.log("pushed membership object", $scope.dataObj);
                            $scope.dataPt4.push($scope.dataObj);
                        }
                    }
                    if($scope.dataPt4 == 0){
                        $scope.isEmpty = true;
                    }
                    return $scope.dataPt4;
                };

                $scope.getDateObj();
                console.log("data object", $scope.data);
                $scope.getMemberObj();
                console.log("dataPt2 object", $scope.dataPt2);
                $scope.getEmailObj();
                console.log("dataPt3 object", $scope.dataPt3);
                $scope.getMembershipObj();
                console.log("dataPt4 object", $scope.dataPt4);

            });

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


    $scope.getArray = function() {

        return $scope.dataPt4;

    };

    $scope.getHeader = function() {
        return headings;
    };

    $scope.clickFn = function () {
        console.log("button clicked");
    }


}]);

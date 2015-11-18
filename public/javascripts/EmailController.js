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



    $scope.emails = [];

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
    ]

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






        $scope.getDateObj = function() {

            $http.get('/data').then(function(res){

                $scope.calledData = res.data;

                console.log("Called Object name", $scope.calledData[i].name);


                console.log("pulled data", res.data);

                $scope.data = [];


                var pushToObj = function(data){
                    $scope.dataObj.push(data.temp_time, data.name, data.member, data.meeting_with, data.email, data.twitter);
                    getEmailList(data.email_me);
                    getIntMember(data.membership);
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

                for(var i = 0; i < $scope.calledData.length; i++){

                    $scope.dataObj = [];

                    var getDateRange = function(date) {

                        //function todayDate() {
                        //    now = new Date();
                        //    year = "" + now.getFullYear();
                        //    month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
                        //    day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
                        //    hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
                        //    minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
                        //    second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
                        //    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
                        //}


                        console.log("orginal date", Date.today().setTimeToNow().toString('yyyy-MM-ddTHH:mm:ssZ'));

                        var weekAgo = (Date.today().setTimeToNow().add({days:-7})).toString('yyyy-MM-ddTHH:mm:ssZ');

                        console.log("week agos date", weekAgo);

                        if($scope.timeselect == "week"){
                            console.log("ran week");
                            if(date > weekAgo){
                                console.log("running week if statement", date);
                                pushToObj($scope.calledData[i]);
                            }
                        } else if ($scope.timeselect == "month"){
                            if(date == Date.today().add({days:-30})){
                                console.log("running month if statement");
                                pushToObj($scope.calledData[i]);
                            }
                        } else if ($scope.timeselect == "sixMonths"){
                            if(date == Date.today().add({days:-180})){
                                console.log("running 6 month if statement");
                                pushToObj($scope.calledData[i]);
                            }
                        } else {
                            pushToObj($scope.calledData[i]);
                            console.log("pushing all")
                        }
                        console.log("pushed object", $scope.dataObj);
                        return $scope.dataObj;
                    };

                    getDateRange($scope.calledData[i].temp_time);
                    //dataObj.push($scope.calledData[i].temp_time, $scope.calledData[i].name, $scope.calledData[i].member, $scope.calledData[i].meeting_with, $scope.calledData[i].email, $scope.calledData[i].twitter);
                    //if($scope.calledData[i].email_me == 0){
                    //    dataObj.push("No");
                    //} else {
                    //    dataObj.push("Yes");
                    //}
                    //if($scope.calledData[i].membership == 0){
                    //    dataObj.push("No");
                    //} else {
                    //    dataObj.push("Yes");
                    //}
                    if($scope.dataObj.length != 0){
                        console.log('running this push');
                        $scope.data.push($scope.dataObj);
                    }
                }
                return $scope.data;

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

        return $scope.emails;

    };

    $scope.getHeader = function() {
        return headings;
    };

    $scope.clickFn = function () {
        console.log("button clicked");
    }


}]);

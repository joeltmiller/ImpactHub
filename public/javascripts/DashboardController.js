/**
 * Created by davidhoverson on 11/6/15.
 */
app.controller('DashboardController', ['$scope', '$http', function($scope, $http) {


    //var d= new Date();
    //var curMonth = d.getMonth()+1;
    //console.log(curMonth);

    //These GET calls could be made to be more efficient.  Current solution based on achieving a MVP.

    $scope.curMonthMem = [];
    $scope.curMonthGue = [];
    $scope.curMonthTot = [];
    $scope.prMonthMem = [];
    $scope.prMonthGue = [];
    $scope.prMonthTot = [];
    $scope.twoMonMem = [];
    $scope.twoMonGue = [];
    $scope.twoMonTot = [];
    $scope.threeMonMem = [];
    $scope.threeMonGue = [];
    $scope.threeMonTot = [];
    $scope.fourMonMem = [];
    $scope.fourMonGue = [];
    $scope.fourMonTot = [];
    $scope.fiveMonMem = [];
    $scope.fiveMonGue = [];
    $scope.fiveMonTot = [];
    $scope.sixMonths = [];

    $http({
        method:'GET',
        url: '/currentMonth'
    }).then(function(response){
        for (var i=0; i <response.data.length; i++) {
            if (response.data[i].temp_member == 0) {
                $scope.curMonthGue.push(response.data[i]);
            } else
            $scope.curMonthMem.push(response.data[i]);
        }
        $scope.curMonthTot = $scope.curMonthMem.concat($scope.curMonthGue);
    });

    $http({
        method:'GET',
        url: '/priorMonth'
    }).then(function(response){
        for (var i=0; i <response.data.length; i++) {
            if (response.data[i].temp_member == 0) {
                $scope.prMonthGue.push(response.data[i]);
            } else
                $scope.prMonthMem.push(response.data[i]);
        }
        $scope.prMonthTot = $scope.prMonthMem.concat($scope.prMonthGue);
    });

    $http({
        method:'GET',
        url: '/priorTwoMonth'
    }).then(function(response){
        for (var i=0; i <response.data.length; i++) {
            if (response.data[i].temp_member == 0) {
                $scope.twoMonGue.push(response.data[i]);
            } else
                $scope.twoMonMem.push(response.data[i]);
        }
        $scope.twoMonthTot = $scope.twoMonMem.concat($scope.twoMonGue);
    });

    $http({
        method:'GET',
        url: '/priorThreeMonth'
    }).then(function(response){
        for (var i=0; i <response.data.length; i++) {
            if (response.data[i].temp_member == 0) {
                $scope.threeMonGue.push(response.data[i]);
            } else
                $scope.threeMonMem.push(response.data[i]);
        }
        $scope.threeMonTot = $scope.threeMonMem.concat($scope.threeMonGue);
    });

    $http({
        method:'GET',
        url: '/priorFourMonth'
    }).then(function(response){
        for (var i=0; i <response.data.length; i++) {
            if (response.data[i].temp_member == 0) {
                $scope.fourMonGue.push(response.data[i]);
            } else
                $scope.fourMonMem.push(response.data[i]);
        }
        $scope.fourMonTot = $scope.fourMonMem.concat($scope.fourMonGue);
    });

    $http({
        method:'GET',
        url: '/priorFiveMonth'
    }).then(function(response){
        for (var i=0; i <response.data.length; i++) {
            if (response.data[i].temp_member == 0) {
                $scope.fiveMonGue.push(response.data[i]);
            } else
                $scope.fiveMonMem.push(response.data[i]);
        }
        $scope.fiveMonTot = $scope.fiveMonMem.concat($scope.fiveMonGue);
    });



        //$http({
        //    method:'JSONP',
        //    url:"https://api.thedatabank.com/v1.0/login.asp?username=IMHSP_API&password=p8nRDaD2X0wc"
        //}).then(function(response) {
        //    console.log("Auth url and response.data", response.data);
        //}, function errorCallBack(response){
        //
        //    console.log("Login error", response);
        //});
        //
        //$http({
        //    method: 'JSONP',
        //    url:"https://api.thedatabank.com/v1.0/secure/SearchMembers.asp?lastname=bailey&callback=JSON_CALLBACK"
        //}).then(function(response){
        //    console.log("Query from dashboard", response.data);
        //
        //}, function errorCallBack(response){
        //
        //    console.log("Search Member dashboard", response);
        //
        //});
    $scope.message = "Dashboard Controller is Working";







    $scope.guestWeek = [];
    $scope.memberWeek = [];

    $http.get('/perWeek').then(function(res) {

        for (var i= 0; i <res.data.length; i++){
            if (res.data[i].temp_member == 0) {
                $scope.guestWeek.push(res.data[i]);
            } else
                $scope.memberWeek.push(res.data[i]);
        }

        // Chart.js Data
        $scope.data = {
            labels: ["Guest","Member"],
            datasets: [
                {
                    label: 'Guest',
                    fillColor: 'rgba(220,220,220,0.5)',
                    strokeColor: 'rgba(220,220,220,0.8)',
                    highlightFill: 'rgba(220,220,220,0.75)',
                    highlightStroke: 'rgba(220,220,220,1)',
                    data: [$scope.guestWeek.length,null]
                },
                {
                    label: 'Member',
                    fillColor: 'rgba(220,220,220,0.5)',
                    strokeColor: 'rgba(220,220,220,0.8)',
                    highlightFill: 'rgba(220,220,220,0.75)',
                    highlightStroke: 'rgba(220,220,220,1)',
                    data: [$scope.memberWeek.length,null]
                }
            ]
        };

        // Chart.js Data
        $scope.data = [
            {
                value: $scope.guestWeek.length,
                color:'#999B9B',
                highlight: 'lightgray',
                label: 'Guest'
            },
            {
                value: $scope.memberWeek.length,
                color: '#812926',
                highlight: '#FF5A5E',
                label: 'Member'
            }
        ];

        // Chart.js Options
        $scope.options =  {



            // Sets the chart to be responsive
            responsive: true,

            //Boolean - Whether we should show a stroke on each segment
            segmentShowStroke : true,

            //String - The colour of each segment stroke
            segmentStrokeColor : '#fff',

            //Number - The width of each segment stroke
            segmentStrokeWidth : 2,

            //Number - The percentage of the chart that we cut out of the middle
            percentageInnerCutout : 0, // This is 0 for Pie charts

            //Number - Amount of animation steps
            animationSteps : 100,

            //String - Animation easing effect
            animationEasing : 'easeOutBounce',

            //Boolean - Whether we animate the rotation of the Doughnut
            animateRotate : true,

            //Boolean - Whether we animate scaling the Doughnut from the centre
            animateScale : false,

            //String - A legend template
            legendTemplate : '<ul class="tc-chart-js-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'

        };
    });






}]);

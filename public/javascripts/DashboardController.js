var app = angular.module('dashboard', ['tc.chartjs', 'vAccordion']);

app.controller('DashboardController', ['$scope', '$http', '$window', function($scope, $http, $window) {


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


    $http({
        method:'GET',
        url: '/currentMonth'
    }).then(function(response){
        for (var i=0; i <response.data.length; i++) {
            if (response.data[i].member == 'No, I\'m a Guest') {
                $scope.curMonthGue.push(response.data[i]);
            } else
            $scope.curMonthMem.push(response.data[i]);
        }
        $scope.curMonthTot = $scope.curMonthMem.concat($scope.curMonthGue);

        $http({
            method:'GET',
            url: '/priorMonth'
        }).then(function(response){
            for (var i=0; i <response.data.length; i++) {
                if (response.data[i].member == 'No, I\'m a Guest') {
                    $scope.prMonthGue.push(response.data[i]);
                } else
                    $scope.prMonthMem.push(response.data[i]);
            }
            $scope.prMonthTot = $scope.prMonthMem.concat($scope.prMonthGue);

            $http({
                method:'GET',
                url: '/priorTwoMonth'
            }).then(function(response){
                for (var i=0; i <response.data.length; i++) {
                    if (response.data[i].member == 'No, I\'m a Guest') {
                        $scope.twoMonGue.push(response.data[i]);
                    } else
                        $scope.twoMonMem.push(response.data[i]);
                }
                $scope.twoMonthTot = $scope.twoMonMem.concat($scope.twoMonGue);

                $http({
                    method:'GET',
                    url: '/priorThreeMonth'
                }).then(function(response){
                    for (var i=0; i <response.data.length; i++) {
                        if (response.data[i].member == 'No, I\'m a Guest') {
                            $scope.threeMonGue.push(response.data[i]);
                        } else
                            $scope.threeMonMem.push(response.data[i]);
                    }
                    $scope.threeMonTot = $scope.threeMonMem.concat($scope.threeMonGue);

                    $http({
                        method:'GET',
                        url: '/priorFourMonth'
                    }).then(function(response){
                        for (var i=0; i <response.data.length; i++) {
                            if (response.data[i].member == 'No, I\'m a Guest') {
                                $scope.fourMonGue.push(response.data[i]);
                            } else
                                $scope.fourMonMem.push(response.data[i]);
                        }
                        $scope.fourMonTot = $scope.fourMonMem.concat($scope.fourMonGue);

                        $http({
                            method:'GET',
                            url: '/priorFiveMonth'
                        }).then(function(response){
                            for (var i=0; i <response.data.length; i++) {
                                if (response.data[i].member == 'No, I\'m a Guest') {
                                    $scope.fiveMonGue.push(response.data[i]);
                                } else
                                    $scope.fiveMonMem.push(response.data[i]);
                            }
                            $scope.fiveMonTot = $scope.fiveMonMem.concat($scope.fiveMonGue);


                            var first = '';
                            var second= '';
                            var third = '';
                            var fourth = '';
                            var fifth = '';
                            var sixth = '';
                            if ($scope.fiveMonGue[0].temp_time.match(/^....-01-................$/)) {
                                first = 'January'; second = 'February'; third = 'March';
                                fourth ='April'; fifth = 'May'; sixth = 'June';
                            } else if ($scope.fiveMonGue[0].temp_time.match(/^....-02-................$/)) {
                                first = 'February'; second = 'March'; third = 'April';
                                fourth ='May'; fifth = 'June'; sixth = 'July';
                            } else if ($scope.fiveMonGue[0].temp_time.match(/^....-03-................$/)) {
                                first = 'March'; second = 'April'; third = 'May';
                                fourth ='June'; fifth = 'July'; sixth = 'August';
                            } else if ($scope.fiveMonGue[0].temp_time.match(/^....-04-................$/)) {
                                first = 'April'; second = 'May'; third = 'June';
                                fourth ='July'; fifth = 'August'; sixth = 'September';
                            } else if ($scope.fiveMonGue[0].temp_time.match(/^....-05-................$/)) {
                                first = 'May'; second = 'June'; third = 'July';
                                fourth ='August'; fifth = 'September'; sixth = 'October';
                            } else if ($scope.fiveMonGue[7].temp_time.match(/^....-06-................$/)) {
                                first = 'June'; second = 'July'; third = 'August';
                                fourth ='September'; fifth = 'October'; sixth = 'November';
                            } else if ($scope.fiveMonGue[0].temp_time.match(/^....-07-................$/)) {
                                first = 'July'; second = 'August'; third = 'September';
                                fourth ='October'; fifth = 'November'; sixth = 'December';
                            } else if ($scope.fiveMonGue[0].temp_time.match(/^....-08-................$/)) {
                                first = 'August'; second = 'September'; third = 'October';
                                fourth ='November'; fifth = 'December'; sixth = 'January';
                            } else if ($scope.fiveMonGue[0].temp_time.match(/^....-09-................$/)) {
                                first = 'September'; second = 'October'; third = 'November';
                                fourth ='December'; fifth = 'January'; sixth = 'February';
                            } else if ($scope.fiveMonGue[0].temp_time.match(/^....-10-................$/)) {
                                first = 'October'; second = 'November'; third = 'December';
                                fourth ='January'; fifth = 'February'; sixth = 'March';
                            } else if ($scope.fiveMonGue[0].temp_time.match(/^....-11-................$/)) {
                                first = 'November'; second = 'December'; third = 'January';
                                fourth ='February'; fifth = 'March'; sixth = 'April';
                            } else if ($scope.fiveMonGue[0].temp_time.match(/^....-12-................$/)) {
                                first = 'December'; second = 'January'; third = 'February';
                                fourth ='March'; fifth = 'April'; sixth = 'May';
                            } else {
                                first = 'No Data Yet';
                            }

                            $scope.priorData = {
                                labels: [first, second, third, fourth, fifth, sixth],
                                datasets: [
                                    {
                                        label: 'Guest',
                                        fillColor: 'rgb(153,155,155)',
                                        strokeColor: 'rgba(220,220,220,0.8)',
                                        highlightFill: 'rgb(211,211,211)',
                                        highlightStroke: 'rgba(220,220,220,1)',
                                        data: [$scope.fiveMonGue.length, $scope.fourMonGue.length, $scope.threeMonGue.length, $scope.twoMonGue.length, $scope.prMonthGue.length, $scope.curMonthGue.length]
                                    },
                                    {
                                        label: 'Member',
                                        fillColor: '#333333',
                                        strokeColor: 'rgba(220,220,220,0.8)',
                                        highlightFill: '#000000',
                                        highlightStroke: 'rgba(220,220,220,1)',
                                        data: [$scope.fiveMonMem.length, $scope.fourMonMem.length, $scope.threeMonMem.length, $scope.twoMonMem.length, $scope.prMonthMem.length, $scope.curMonthMem.length]
                                    }
                                ]
                            };

                            // Chart.js Options
                            $scope.options2 =  {

                                // Sets the chart to be responsive
                                responsive: true,

                                //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
                                scaleBeginAtZero : true,

                                //Boolean - Whether grid lines are shown across the chart
                                scaleShowGridLines : true,

                                //String - Colour of the grid lines
                                scaleGridLineColor : "rgba(255,255,255,0.1)",

                                //Number - Width of the grid lines
                                scaleGridLineWidth : 1,

                                //Boolean - If there is a stroke on each bar
                                barShowStroke : true,

                                //Number - Pixel width of the bar stroke
                                barStrokeWidth : 1,

                                //Number - Spacing between each of the X value sets
                                barValueSpacing : 5,

                                //Number - Spacing between data sets within X values
                                barDatasetSpacing : 1,

                                //String - A legend template
                                legendTemplate : '<ul class="graphlable     tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
                            };

                        });
                    });
                });
            });
        });
    });

    $scope.guestWeek = [];
    $scope.memberWeek = [];

    $http.get('/perWeek').then(function(res) {

        for (var i= 0; i <res.data.length; i++){
            if (res.data[i].member == 'No, I\'m a Guest') {
                $scope.guestWeek.push(res.data[i]);
            } else
                $scope.memberWeek.push(res.data[i]);
        }

        // Chart.js Data
        $scope.weekData = {
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
        $scope.weekData = [
            {
                value: $scope.guestWeek.length,
                color:'#999B9B',
                highlight: 'lightgray',
                label: 'Guest'
            },
            {
                value: $scope.memberWeek.length,
                color: '#333333',
                highlight: '#000000',
                label: 'Member'
            }
        ];
    });

    $scope.sixMonthsGuest = [];
    $scope.sixMonthsMember = [];

    $http.get('/getSixMonthsGuest').then(function(res) {

        $scope.sixMonthsGuest = res.data;

        $http.get('/getSixMonthsMember').then(function(res){

            $scope.sixMonthsMember = res.data;

            // Chart.js Data
            $scope.monthData = {
                labels: ["Guest","Member"],
                datasets: [
                    {
                        label: 'Guest',
                        fillColor: 'rgba(220,220,220,0.5)',
                        strokeColor: 'rgba(220,220,220,0.8)',
                        highlightFill: 'rgba(220,220,220,0.75)',
                        highlightStroke: 'rgba(220,220,220,1)',
                        data: [$scope.sixMonthsGuest.length]
                    },
                    {
                        label: 'Member',
                        fillColor: '#333333',
                        strokeColor: 'rgba(220,220,220,0.8)',
                        highlightFill: '#000000',
                        highlightStroke: 'rgba(220,220,220,1)',
                        data: [$scope.sixMonthsMember.length]
                    }
                ]
            };

            // Chart.js Data
            $scope.monthData = [
                {
                    value: $scope.sixMonthsGuest.length,
                    color:'#999B9B',
                    highlight: 'lightgray',
                    label: 'Guest'
                },
                {
                    value: $scope.sixMonthsMember.length,
                    color: '#333333',
                    highlight: '#000000',
                    label: 'Member'
                }
            ];

        });
    });

    // Chart.js Options
    $scope.options = {

        // Sets the chart to be responsive
        responsive: true,

        //Boolean - Whether we should show a stroke on each segment
        segmentShowStroke: true,

        //String - The colour of each segment stroke
        segmentStrokeColor: '#fff',

        //Number - The width of each segment stroke
        segmentStrokeWidth: 1,

        //Number - The percentage of the chart that we cut out of the middle
        percentageInnerCutout: 0, // This is 0 for Pie charts

        //Number - Amount of animation steps
        animationSteps: 100,

        //String - Animation easing effect
        animationEasing: 'easeOutBounce',

        //Boolean - Whether we animate the rotation of the Doughnut
        animateRotate: true,

        //Boolean - Whether we animate scaling the Doughnut from the centre
        animateScale: false,

        //String - A legend template
        legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'
    };

    //animated banner on scroll
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

    //beginning of a possible way to access member data through thedatabank.

    //$scope.membA = [];
    //$scope.membB = [];
    //$scope.membC = [];
    //$scope.membD = [];
    //$scope.membE = [];
    //$scope.membF = [];
    //$scope.membG = [];
    //$scope.membH = [];
    //
    //
    //$http({
    //    method:'GET',
    //    url:'/memberRevenue'
    //}).then(function(response){
    //    var datatest = JSON.parse(response.data);
    //    for (var i=0; i < datatest.Contributions.length; i++) {
    //        if (datatest.Contributions[i].Segment == 'membA' || datatest.Contributions[i].Segment =='MEMBA') {
    //            $scope.membA.push(datatest.Contributions[i]);
    //        } else if (datatest.Contributions[i].Segment == 'membB' || datatest.Contributions[i].Segment =='MEMBB') {
    //            $scope.membB.push(datatest.Contributions[i]);
    //        } else if (datatest.Contributions[i].Segment == 'membC' || datatest.Contributions[i].Segment =='MEMBC') {
    //            $scope.membC.push(datatest.Contributions[i]);
    //        } else if (datatest.Contributions[i].Segment == 'membD' || datatest.Contributions[i].Segment =='MEMBD') {
    //            $scope.membD.push(datatest.Contributions[i]);
    //        } else if (datatest.Contributions[i].Segment == 'membE' || datatest.Contributions[i].Segment =='MEMBE') {
    //            $scope.membE.push(datatest.Contributions[i]);
    //        } else if (datatest.Contributions[i].Segment == 'membF' || datatest.Contributions[i].Segment =='MEMBF') {
    //            $scope.membF.push(datatest.Contributions[i]);
    //        } else if (datatest.Contributions[i].Segment == 'membG' || datatest.Contributions[i].Segment =='MEMBG') {
    //            $scope.membG.push(datatest.Contributions[i]);
    //        } else if (datatest.Contributions[i].Segment == 'membH' || datatest.Contributions[i].Segment =='MEMBH') {
    //            $scope.membH.push(datatest.Contributions[i]);
    //        }
    //    }
    //    $scope.membATot = function(){
    //        var total = parseFloat(0);
    //        for (var i=0; i < $scope.membA.length; i++) {
    //            total += $scope.membA[i].Contribution_Amount;
    //        } return total;
    //    };
    //    console.log($scope.membATot());
    //});
}]);

/**
 * Created by davidhoverson on 11/6/15.
 */
app.controller('DashboardController', ['$scope', '$http', function($scope, $http) {

        $scope.guestWeek = [];

        $http({
            method:'GET',
            url: '/guestWeek'
        }).then(function(response){
            $scope.guestWeek = [];
            for (var i= 0; i <response.data.length; i++){
                $scope.guestWeek.push(response.data[i]);
            }
            console.log($scope.guestWeek.length);
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







    $scope.responseData = [];

    $http.get('/data').then(function(res) {
        $scope.responseData = res.data;
    });
    console.log($scope.responseData);

    // Chart.js Data
    $scope.data = {  };

    // Chart.js Options
    $scope.options = {

        // Sets the chart to be responsive
        responsive: true,
        //Boolean - Whether we should show a stroke on each segment
        segmentShowStroke : true,
        //String - The colour of each segment stroke
        segmentStrokeColor : '#fff',
        //Number - The width of each segment stroke
        segmentStrokeWidth : 2,

        //Number - The percentage of the chart that we cut out of the middle
        percentageInnerCutout : 50, // This is 0 for Pie charts

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


}]);

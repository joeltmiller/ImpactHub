var app = angular.module('dashboard', ['ngRoute', 'tc.chartjs']);

app.config(function($routeProvider, $locationProvider){
    $routeProvider
        .when('/graphs',{
            templateUrl:'views/graphs.html',
            controller: 'DashboardController'
        })
        .when('/email', {
            templateUrl: 'views/email.html',
            controller: 'EmailController'
        })
        .otherwise({
            redirectTo: '/graphs'

        });


    $locationProvider.html5Mode(true);
});
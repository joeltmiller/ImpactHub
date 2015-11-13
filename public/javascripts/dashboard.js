var app = angular.module('dashboard', ['ngRoute', 'ngCsv']);

app.config(function($routeProvider, $locationProvider){
    $routeProvider
        .when('/data',{
            templateUrl:'views/data.html',
            controller: 'DashboardController'
        })
        .when('/email', {
            templateUrl: 'views/email.html',
            controller: 'EmailController'
        })
        .otherwise({
            redirectTo: '/data'

        });


    $locationProvider.html5Mode(true);
});
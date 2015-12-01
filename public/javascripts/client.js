var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider, $locationProvider){
    $routeProvider
        .when('/',{
            templateUrl:'views/home.html',
            controller: 'HomeController'
        })
        .when('/signin',{
            templateUrl:'views/signin.html',
            controller: 'SigninController'
        })
        .when('/guestinfo', {
            templateUrl: 'views/guestinfo.html',
            controller: 'GuestFormController'
        })
        .when('/thanks', {
            templateUrl: 'views/thanks.html',
            controller: 'ThankYouController'
        })
        .when('/whoshere',{
            templateUrl: 'views/whoshere.html',
            controller: 'WhosHereController'
        })
        .otherwise({
            redirectTo: '/'

        });


    $locationProvider.html5Mode(true);
});


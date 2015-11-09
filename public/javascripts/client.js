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
        .when('/admin', {
            templateUrl: 'views/admin.html',
            controller: 'AdminController'
        })
        .when('/thanks', {
            templateUrl: 'views/thanks.html',
            controller: 'ThankYouController'
        })
        .when('/signuptest', {
            templateUrl: 'views/signup.html',
            controller: 'SignupController'
        })
        .otherwise({
            redirectTo: '/'
        });


    $locationProvider.html5Mode(true);
});


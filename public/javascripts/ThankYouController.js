/**
 * Created by davidhoverson on 11/6/15.
 */
app.controller('ThankYouController', ['$scope', '$timeout', '$location', function($scope,$timeout,$location) {

    $scope.message = "Thank You Controller is Working";

    //Adds in some loadings dots for UX before page load.
    var dots = window.setInterval( function() {
        var wait = document.getElementById("wait");
        if ( wait.innerHTML.length > 2 )
            wait.innerHTML = "";
        else
            wait.innerHTML += ".";
    }, 500);

    //Changes the thanks page to index after 3 seconds.
    $timeout(function() {
        $location.path("/index")
    }, 5000);

}]);
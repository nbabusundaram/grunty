app.controller('mvNavBarLoginCtrl',function($scope,$http,mvidentity,mvNotifier,mvAuth,$location){
    $scope.identity = mvidentity;

    $scope.signin = function (username,password) {
        mvAuth.authenticateUser(username, password).then(function (sucess) {
            if (sucess) {
                mvNotifier.notify("You have sucessfully logged in");
                $location('/partials/main/main');
            } else {
                mvNotifier.notify("failed to login!");
            }
        })

    }

    $scope.signout = function(){
        mvAuth.logoutUser().then(function(){
            $scope.username = "";
            $scope.password = "";

            mvNotifier.notify("You have successfully logged out");
            $location.path('/');
        })
    };
});
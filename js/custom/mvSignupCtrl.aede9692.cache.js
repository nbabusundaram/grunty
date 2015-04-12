app.controller('mvSignupCtrl', function($scope,mvUser,mvNotifier,$location,mvAuth) {

    $scope.signup = function() {
        var newUserData = {
            username: $scope.email,
            password: $scope.password,
            firstname: $scope.fname,
            lastname: $scope.lname
        };
console.log('BHANU');
        mvAuth.createUser(newUserData).then(function() {
            mvNotifier.Notify("User Account Created");
            $location.path('/');
        }, function(reason) {
            mvNotifier.error(reason);
        });
    }
})
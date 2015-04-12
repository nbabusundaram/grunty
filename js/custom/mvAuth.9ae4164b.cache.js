app.factory('mvAuth', function($http, mvidentity, $q, mvUser) {
    return {
        authenticateUser: function(username, password) {
            var dfr = $q.defer();
            $http.post('/login', {
                username: username,
                password: password
            }).then(function(response) {

                if (response.data.success) {
                    //console.log("logged in");
                    var user = new mvUser();
                    angular.extend(user, response.data.user)
                    mvidentity.currentuser = user;
                    dfr.resolve(true);
                    //mvNotifier.notify("You have sucessfully logged in");
                } else {
                    //console.log("failed to login!");
                    //mvidentity.currentuser = 'bhanu';
                    //mvNotifier.notify("failed to login!");
                    dfr.resolve(false);
                }
            });
            return dfr.promise;
        },

        createUser: function(newUserData) {
            var newUser = new mvUser(newUserData);
            var dfd = $q.defer();
            newUser.$save().then(function() {
                console.log('newuser:'+JSON.stringify(newUser));
                mvidentity.currentuser = newUser;
                dfd.resolve();
            }, function(response) {
                dfd.reject(response.data.reason);
            });
            return dfd.promise;
        },

        logoutUser: function() {
            var dfr = $q.defer();

            $http.post('/logout', {
                logout: true
            }).then(function() {
                mvidentity.currentuser = undefined;
                dfr.resolve();
            });
            return dfr.promise;
        },

        authorizeCurrentUserForRoute: function(role) {
            if (mvidentity.isAuthorized(role)) {
                return true
            } else {
                return $q.reject("not authorized")
            }
        }
    }
});
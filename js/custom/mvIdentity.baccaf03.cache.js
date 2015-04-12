app.factory('mvidentity',function($window,mvUser){
    var currentuser;
    if(!!window.bootstrappedUserObject){
        var currentuser = new mvUser();
        angular.extend(currentuser,$window.bootstrappedUserObject)
        //currentuser = $window.bootstrappedUserObject;
    }
    return{
        currentuser:currentuser,
        isauthenticated:  function(){
            return !!this.currentuser;
        }
    }
    // ,
    // isAuthorized: function(role){
    //     return !!this.currentuser && this.currentuser.roles.indexOf(role)>-1;
    // }

 });
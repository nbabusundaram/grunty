app.factory('mvUser', function($resource) {
    var UserResourse = $resource('api/users/:id', {
        _id: "@id"
    }, {
        'query': {
            method: 'GET',
            isArray: true
        }
    });

    UserResourse.prototype.isAdmin = function() {
        return this.roles && this.roles.indexOf('admin') > -1
    }

    return UserResourse;
});
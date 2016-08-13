angular.module('starter.userService',[])
.service('user', function($http,$q){
    var _user = undefined;
    var _users = undefined;

    this.all = function(){

                      var deferred = $q.defer();

                      $http.get("http://localhost:5001/api/users/")
                          .success(function(response) {
                              deferred.resolve(response);
                          })
                          .error(function(response) {
                              deferred.reject(response);
                          });
                      _users = deferred.promise;

      return _users;
    };

    this.get = function(id){
      var deferred = $q.defer();

      $http.get("http://localhost:5001/api/users/"+id)
          .success(function(response) {
              console.log(response);
              deferred.resolve(response);
          })
          .error(function(response) {
              deferred.reject(response);
          });
          _user = deferred.promise;
        return _user;
    };

    this.create = function(user){
      var deferred = $q.defer();

      $http.post("http://localhost:5001/api/users", user)
          .success(function(response) {
              console.log(response);
              deferred.resolve(response);
          })
          .error(function(response) {
              deferred.reject(response);
          });
          _user = deferred.promise;
        return _user;
    }
    this.update = function(user){
      var deferred = $q.defer();

      $http.put("http://localhost:5001/api/users/"+user._id, user)
          .success(function(response) {
              console.log(response);
              deferred.resolve(response);
          })
          .error(function(response) {
              deferred.reject(response);
          });
          _user = deferred.promise;
        return _user;
    }
    this.delete = function(id){
      var deferred = $q.defer();

      $http.delete("http://localhost:5001/api/users/"+id)
          .success(function(response) {
              console.log(response);
              deferred.resolve(response);
          })
          .error(function(response) {
              deferred.reject(response);
          });
          _user = deferred.promise;
        return _user;
    }
});

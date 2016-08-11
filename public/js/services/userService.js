angular.module('pokeApp.userService',[])
.service('user', function($http,$q){
    var _user = undefined;
    var _users = undefined;

    this.all = function(){

                      var deferred = $q.defer();

                      $http.get("api/users/")
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

      $http.get("api/users/"+id)
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

      $http.post("api/users", user)
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

      $http.put("api/users/"+user._id, user)
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

      $http.delete("api/users/"+id)
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

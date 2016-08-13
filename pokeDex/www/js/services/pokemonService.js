angular.module('starter.pokemonService',[])
.service('pokemonService', function($http,$q){
    var _pokemons = [];
    var _pokemon = {};
    this.getPokemons = function(){
        return _pokemons;
    };
    this.setPokemons = function(pokemons){
        _pokemons = pokemons;
    };

    this.getPokemonsService = function(){
      deferred = $q.defer();
      $http({
          method: 'GET',
          url: 'api/pokemons'
      }).success(function(response){
          // With the data succesfully returned, we can resolve promise and we can access it in controller
          deferred.resolve(response);
      }).error(function(){
           alert("error");
           //let the function caller know the error
           deferred.reject(error);
      });
      return deferred.promise;
    }

    this.create = function(pokemon){
      var deferred = $q.defer();

      $http.post("api/pokemons", pokemon)
          .success(function(response) {
              console.log(response);
              deferred.resolve(response);
          })
          .error(function(response) {
              deferred.reject(response);
          });
          _pokemon = deferred.promise;
        return _pokemon;
    }

    this.update = function(pokemon){
      var deferred = $q.defer();

      $http.put("api/pokemons/"+pokemon._id, pokemon)
          .success(function(response) {
              console.log(response);
              deferred.resolve(response);
          })
          .error(function(response) {
              deferred.reject(response);
          });
          _pokemon = deferred.promise;
        return _pokemon;
    }

    this.delete = function(pokemon){
      var deferred = $q.defer();

      $http.put("api/pokemons/"+pokemon._id, pokemon)
          .success(function(response) {
              console.log(response);
              deferred.resolve(response);
          })
          .error(function(response) {
              deferred.reject(response);
          });
          _pokemon = deferred.promise;
        return _pokemon;
    }

    this.getPokemon = function(pokemon){
      var deferred = $q.defer();

      $http.get("api/pokemons/"+pokemon._id)
          .success(function(response) {
              console.log(response);
              deferred.resolve(response);
          })
          .error(function(response) {
              deferred.reject(response);
          });
          _pokemon = deferred.promise;
        return _pokemon;
    }
});

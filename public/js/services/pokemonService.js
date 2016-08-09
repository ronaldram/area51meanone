angular.module('pokeApp.pokemonService',[])
.service('pokemonService', function($http,$q){
    var _pokemons = [];
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
          url: 'bd_pokemon/pokemons.json'
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
});

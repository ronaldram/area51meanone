angular.module('pokeApp.loginCtrl',[])
.controller('loginCtrl', function($http, $location, pokemonService){
  var vm = this;
  vm.message = 'This is the login';

  vm.authentication = function(){
    $location.path('/pokemons');
  }

  vm.getPokemons = function(){
    $http.get("bd_pokemon/pokemons.json")
    .then(function(response){
        pokemonService.setPokemons(response.data);
        console.log( response.data[0]);
    });

  };

  vm.getPokemons();
});

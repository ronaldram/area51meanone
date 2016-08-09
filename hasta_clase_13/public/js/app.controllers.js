angular.module('pokeApp.controllers',[])
.controller('mainCtrl', function($location){
   var vm = this;
   vm.goToPage = function(route){
     $location.path(route);
   };
})
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
})
.controller('userCtrl', function(){
  var vm = this;
  vm.message = 'This is the user admin ';
})
.controller('pokemonCtrl', function(pokemonService, LxDialogService){
  var vm = this;

  vm.DialogId = 'dialog1';
  vm.pokemonSelected = null;
  //vm.pokemons = pokemonService.getPokemons();
  pokemonService.getPokemonsService().then(function(response) {
        vm.pokemons = response;
        console.log('respondio');
        console.log(response);
  });
  vm.openDialog = function(pokemon){
    console.log('open dialogs');
    vm.pokemonSelected = pokemon;
    LxDialogService.open('dialog1');
  }
  vm.message = 'This is the pokemon admin';
});

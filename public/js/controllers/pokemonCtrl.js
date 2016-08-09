angular.module('pokeApp.pokemonCtrl',[])
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

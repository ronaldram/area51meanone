angular.module('pokeApp.pokemonCtrl',[['pokeApp.userService']])
.controller('pokemonsCtrl', function(pokemonService, user){
  var vm = this;

  vm.DialogId = 'dialog1';
  vm.pokemonSelected = null;

  vm.openDialog = function(pokemon){
    console.log('open dialogs');
    vm.pokemonSelected = pokemon;
    LxDialogService.open('dialog1');
  }
  vm.message = 'This is the pokemon admin';

  vm.getAll = function(){
    pokemonService.getPokemonsService().then(function(response) {
          vm.pokemons = response;
          console.log('respondio');
          console.log(response);
    });
  }

  vm.delete = function(){

  };

  vm.getAll();
})
.controller('pokemonCtrl', function(pokemonService, user){
  var vm = this;
  vm.users = {};
  vm.userData = {};
  vm.initializer = function(){
    user.all().then(function(response) {
          vm.users = response;
    });
  }

  vm.submit = function(){

  };

});

angular.module('starter.loginCtrl',[])
.controller('loginCtrl', function($http, $location, pokemonService, authService){
  var vm = this;
  vm.userAuthenticage = {};
  vm.message = 'This is the login';

  vm.authentication = function(){
     authService.login(vm.userAuthenticage.username,  vm.userAuthenticage.password).then(function(response){
       console.log(response);
       if(response.data.success){
          $location.path('/pokemons');
        }else {
          alert('Invalid user');
        }
      });

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

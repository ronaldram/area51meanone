angular.module('pokeApp.controllers',[])
.controller('loginCtrl', function(){
  var vm = this;
  vm.message = 'This is the login';
})
.controller('userCtrl', function(){
  var vm = this;
  vm.message = 'This is the user admin ';
})
.controller('pokemonCtrl', function(){
  var vm = this;
  vm.message = 'This is the pokemon admin';
});

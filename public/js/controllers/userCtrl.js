angular.module('pokeApp.userCtrl',['pokeApp.userService'])
.controller('userCtrl', function(user){
  var vm = this;
  vm.message = 'This is the user admin ';
});

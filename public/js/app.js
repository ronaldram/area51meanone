angular.module('pokeApp',
[
  'pokeApp.routes',
  'pokeApp.loginCtrl',
  'pokeApp.mainCtrl',
  'pokeApp.pokemonCtrl',
  'pokeApp.userCtrl',
  'pokeApp.pokemonService',
  'pokeApp.authService',
  'pokeApp.userService',
  'lumx'
])
// ).config(function($httpProvider){
//     $httpProvider.interceptors.push(AuthInterceptor);
// });

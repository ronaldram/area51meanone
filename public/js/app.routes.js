angular.module('pokeApp.routes',['ngRoute'])
.config(function($routeProvider, $locationProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'views/pages/login.html',
    controller:'loginCtrl',
    controllerAs: 'login'
  })
  .when('/login', {
    templateUrl: 'views/pages/login.html',
    controller:'loginCtrl',
    controllerAs: 'login'
  })
  .when('/users', {
    templateUrl: 'views/pages/users/users.html',
    controller:'usersCtrl',
    controllerAs: 'users'
  })
  .when('/user', {
    templateUrl: 'views/pages/users/user.html',
    controller:'userCtrl',
    controllerAs: 'user'
  })
  .when('/pokemons', {
    templateUrl: 'views/pages/pokemons/pokemons.html',
    controller:'pokemonsCtrl',
    controllerAs: 'pokemons'
  })
  .otherwise({
    redirectTo :'/login'
  })
  $locationProvider.html5Mode({enabled: true,
  requireBase: false});
});

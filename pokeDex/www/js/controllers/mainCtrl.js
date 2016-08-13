angular.module('starter.mainCtrl',[])
.controller('mainCtrl', function($location, authService, $rootScope){
   var vm = this;

   vm.loggedIn = authService.isLoggedIn();

   $rootScope.$on('$routeChangeStart', function(){
     vm.loggedIn = authService.isLoggedIn();
   });

   vm.goToPage = function(route){
     $location.path(route);
   };

   vm.logout = function(){
     authService.logout();
     $location.path('/login');
   }
});

angular.module('pokeApp.mainCtrl',[])
.controller('mainCtrl', function($location){
   var vm = this;
   vm.goToPage = function(route){
     $location.path(route);
   };
});

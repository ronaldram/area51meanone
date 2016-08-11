angular.module('pokeApp.userCtrl',['pokeApp.userService'])
.controller('usersCtrl', function($location,user){
  var vm = this;

  vm.message = 'This is the user admin ';
  vm.all = function(){
    user.all().then(function(response) {
          vm.users = response;
          console.log('respondio');
          console.log(response);
    });
  }

  vm.edit = function(id){
      $location.path('/user?id='+id);
  };

  vm.delete = function(id){
      user.delete(id).then(function(response){
       vm.userData = response;
       console.log(response);
    });
    vm.all();
  };


  vm.all();
})
.controller('userCtrl', function($routeParams, $location,user){
  var vm = this;
  vm.userData = {};
  console.log($routeParams.id);
  if($routeParams.id)
     user.get($routeParams.id).then(function(response){
    vm.userData = response;
      console.log(response);
  });

  vm.register = function(){
      if(vm.userData._id)
        user.update(vm.userData).then(function(response){
        console.log(response);
        });
      else
        user.create(vm.userData).then(function(response){
          console.log(response);
        });
      $location.path('/users');
  };


});

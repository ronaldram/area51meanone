angular.module('myApp.controllers',[])
.controller('mainCtrl', function($scope, $filter){
  $scope.message = 'Application have been created!';
  $scope.name = 'Ronald Ameri';

  $scope.toLowerCase = $filter('lowercase')($scope.name);

  console.log($scope.message);
})
.controller('clockCtrl', function($scope){
    $scope.clock = {now : new Date()  };
    var updateClock = function(){
      $scope.clock.now = new Date();
    };

    $scope.changeClock = function(){
      updateClock();
    }
    /*setInterval(function(){
      $scope.$apply(updateClock);
    }, 100)
    */
}).controller('citiesCtrl', function($scope, cityService) {
      $scope.cities = cityService.getCities();
      $scope.searchCity = function(cityAbbr){
        $scope.city = cityService.getCity(cityAbbr)[0];
      }
});

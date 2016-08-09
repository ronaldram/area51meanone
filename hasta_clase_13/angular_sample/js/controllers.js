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

      $scope.myLink = "http://google.com";

      $scope.fields =[
        {placeholder: 'abbr', isRequired:true},
        {placeholder: 'name', isRequired:true}
      ];

      $scope.searchCity = function(cityAbbr){
        $scope.oneCity = cityService.getCity(cityAbbr)[0];
      }

      $scope.filtrarCities = function(cityAbbr){
        $scope.cities = cityService.getCity(cityAbbr);
      }

      $scope.multiplicar = function (){
        $scope.result = Number($scope.myNumber)*5;
      }
      $scope.generateNumber = function(){
        return (Math.floor(Math.random()*10)+1);
      }
});

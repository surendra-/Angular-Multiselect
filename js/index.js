
var app = angular.module('demoApp',['ngMaterial','ngRoute']);


app.config(function($routeProvider){
  $routeProvider
  .when('/',{
    templateUrl:'index.html',
    controller: 'mainController'
  })
  .otherwise({redirectTo:'/'});
});

app.controller('mainController',function($scope,$http){
    var url = "https://surendra-app-server.herokuapp.com/api/clothes?callback=JSON_CALLBACK";
    $scope.totalClothes = [];
    $scope.selectedClothes1 = [];
    $scope.selectedClothes2 = [];
    $scope.selectedClothes3 = [];
    $scope.selectedClothes4 = 
          [{"id":9,"name":"jeans","category":"clothes"},{"id":10,"name":"cap"},{"id":2,"name":"shoes","category":"shoes"}];
    $scope.selectedClothes5 = [];
    $scope.selectedItems = null;
    $scope.searchText = null;
    $scope.querySearch = querySearch;
    $scope.querySearch1 = querySearch1;

    $scope.newCloth = function(chip) {
      return {
        name:chip
      };
    };


    $http.jsonp(url)
      .success(function(data){
          $scope.totalClothes = data.map(function(cloth){
            cloth.name = cloth.name.toLowerCase();
            return cloth;
          });
      });

    function querySearch (query) {
      var results = query ? $scope.totalClothes.filter(createFilterFor(query)) : [];
      return results;
    }

    function querySearch1 (query) {
      var results = query ? $scope.totalClothes.filter(createFilterFor(query)) : $scope.totalClothes;
      return results;
    }

    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(cloth) {
        return (cloth.name.indexOf(lowercaseQuery) != -1);
      };

    }
    
});


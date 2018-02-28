define(['app'], function (app) {
  return app.controller('map_stateCtrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
    setTimeout(function(){
      console.log($scope.map.getMap());
    },2000);
  }])
});
define(['app'], function (app) {
  return app.controller('run_stateCtrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
    $rootScope.headTitle = $rootScope.title = "hello,angular!";
    $rootScope.appName = $rootScope.span = "angular侧导航";
    // $scope.getMore = function () {
    //   angular.element('.state').text('正在运行')
    // };
    // $http.get('./json/215145.json').
    // success(function (data) {
    //   $scope.branchs = data.branchs;
    // });
  }])
});
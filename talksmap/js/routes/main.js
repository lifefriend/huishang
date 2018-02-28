/**
 * 路由
 */
define(['app'], function (app) {
  return app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'js/views/run_state.html',
        controller: 'run_stateCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }])
});
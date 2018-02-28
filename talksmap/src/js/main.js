/**
 * 入口文件
 */
require.config({
      baseUrl: "js/",
      packages: [
            { name: 'route', location: 'routes', main: 'main' },
            { name: 'controller', location: 'controllers', main: 'main' },
            { name: 'directive', location: 'directives', main: 'main' }
      ],
      paths: {
            "ol":"libs/ol/ol",
            "maptalks":"libs/maptalks-0.38.2/maptalks.min",
            "jquery": "libs/jquery.min",
            "angular": "libs/angular-1.6.9/angular.min",
            "angular-route": "libs/angular-1.6.9/angular-route.min",
            "angular-sanitize": "libs/angular-1.6.9/angular-sanitize.min",
            "app":"framework/app",
            "config":"../config/gisconfig"
      },
      shim: {
            'angular': {
                  exports: 'angular'
            },
            'angular-route': {
                  deps: ["angular"],
                  exports: 'angular-route'
            },
            'angular-sanitize': {
                  deps: ["angular"],
                  exports: 'angular-sanitize'
            }
      }
});
require(['jquery', 'angular', 'angular-route', 'angular-sanitize','app','route','directive','controller'], function ($, angular) {
      $(function () {
            angular.bootstrap(document, ["myApp"]);
      });
      //"loadingInterceptor" : "controllers/loadingInterceptor"  
});
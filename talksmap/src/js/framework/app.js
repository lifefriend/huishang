/**
 * 建立angular.module
 */
define(['angular'], function (angular) {
  var app = angular.module('myApp', ['ngRoute','ngSanitize']);
  return app;
});
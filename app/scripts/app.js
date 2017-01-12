'use strict';

/**
 * @ngdoc overview
 * @name norluxAngularApp
 * @description
 * # norluxAngularApp
 *
 * Main module of the application.
 */
angular
  .module('norluxAngularApp', [
    'ngAnimate',
    'ngCookies',
    'angular.filter',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'btford.markdown'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      });
    $locationProvider.html5Mode(true);
      // .hashPrefix('!');
  });

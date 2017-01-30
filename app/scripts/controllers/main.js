'use strict';

/**
 * @ngdoc function
 * @name norluxAngularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the norluxAngularApp
 */
angular.module('norluxAngularApp')
  .controller('MainCtrl', function ($scope) {
    $scope.search = '';

    new WOW().init();
  });

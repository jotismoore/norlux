'use strict';

angular.module('norluxAngularApp')
  .filter('trustAsHtml', function($sce){
    return function(input){
      return $sce.trustAsHtml(input);
    };
  });

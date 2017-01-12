'use strict';

angular.module('norluxAngularApp')
  .filter('groupby', function(){
    return function(items,group){
      return items.filter(function(element) {
        return parseInt(element.time)===group;
      });
    };
  });

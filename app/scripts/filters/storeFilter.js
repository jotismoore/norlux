'use strict';

angular.module('norluxAngularApp')
  .filter('groupby', function(){
    return function(items,group){
      return items.filter(function(element, index, array) {
        return parseInt(element.time)==group;
      });
    }
  });

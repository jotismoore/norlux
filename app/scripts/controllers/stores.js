'use strict';

/**
 * @ngdoc function
 * @name norluxAngularApp.controller:StoreCtrl
 * @description
 * # StoreCtrl
 * Controller of the norluxAngularApp
 */
angular.module('norluxAngularApp')
  .controller('StoreCtrl', function ($scope, Stores, $filter) {
    $scope.$on('$locationChangeStart', function(ev) {
      ev.preventDefault();
    });
    Stores.then(function(data){
      var indexedStores = [];
      $scope.stores = data;

      $scope.storesToFilter = function() {
        indexedStores = [];
        return $scope.stores;
      };

      $scope.filterStores = function(store) {
        var storeIsNew = indexedStores.indexOf(store.country) == -1;
        if (storeIsNew) {
          indexedStores.push(store.country);
        }
        return storeIsNew;
      }
    });

    // $scope.ordering = function(arr) {
      // return $filter('min')
      // ($filter('map')(arr, 'country'));
    // };

  });

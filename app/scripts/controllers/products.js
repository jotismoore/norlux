'use strict';

/**
 * @ngdoc function
 * @name norluxAngularApp.controller:ProductCtrl
 * @description
 * # ProductCtrl
 * Controller of the norluxAngularApp
 */
angular.module('norluxAngularApp')
  .controller('ProductCtrl', function ($scope, Products, $modal) {
    Products.then(function(data){
      $scope.categories = [];
      $scope.products = data;

      $scope.openProduct=function($index){
        $scope.products[$index].active=true;
        $scope.modalInstance=$modal.open({
          templateUrl: 'views/view-product-modal.html',
          scope: $scope,
          windowClass: 'productModal'
        });
        $scope.modalInstance.opened.then(function() {
          var modal;
          var getModalInterval = function () {
            modal = document.getElementsByClassName('productModal')[0];
            if (modal) {
              clearInterval(getModal);
              $(modal).find('.loader').hide();
              $(modal).find('.carousel-inner').fadeIn();
              $(modal).find('.carousel-control').fadeIn();
            }
          };
          modal = document.getElementsByClassName('productModal')[0];
          if (!modal) {
            var getModal = setInterval(getModalInterval, 2000);
          }
        });
      };

      for (var cat in $scope.products) {
        if ($scope.products[cat].hasOwnProperty('category')) {
          if ($scope.categories.indexOf($scope.products[cat].category) < 0) {
            $scope.categories.push($scope.products[cat].category);
          }
        }
      }

      $scope.closeProduct=function(){
        for (var x in $scope.products) {
          if ($scope.products[x].hasOwnProperty('active')) {
            $scope.products[x].active=false;
          }
        }
        $scope.modalInstance.close();
      };

    });

    $scope.productFilter = 'LED Ceiling';

    $scope.filterCategory = function(category) {
      if ($scope.productFilter != category) {
        $('.products-container .thumbnail').hide();
        $scope.productFilter = category;
      }
    };
  });

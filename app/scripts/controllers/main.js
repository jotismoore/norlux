'use strict';

/**
 * @ngdoc function
 * @name norluxAngularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the norluxAngularApp
 */
angular.module('norluxAngularApp')
  .controller('MainCtrl', function ($scope, Products, Stores, $filter) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    Products.then(function(data){
      $scope.products = data;
    });

    Stores.then(function(data){
      $scope.stores = data;
    });

    $scope.ordering = function(arr) {
      return $filter('min')
      ($filter('map')(arr, 'country'));
    };

    $scope.productModal = new ViewProductModel();

    $scope.productFilter = 'LED Ceiling';

    $scope.filterCategory = function(category) {
      if ($scope.productFilter != category) {
        $('.products-container .thumbnail').hide();
        $scope.productFilter = category;
      }
    };

    $scope.caseStudiesImages = [
      "car_park_01",
      "car_showroom_01",
      "car_showroom_02",
      "electronics_01",
      "electronics_02",
      "fashion_01",
      "fashion_02",
      "fashion_03"
    ];

    $scope.caseStudiesFiles = function(imageName, thumb) {
      var folder = imageName.substring(0, imageName.lastIndexOf('_'));
      if (thumb) {
        return 'images/case_studies/' + folder + '/thumbnail_' + imageName + '.png';
      }
      else {
        return 'images/case_studies/' + folder + '/' + imageName + '.jpg';
      }
    };

    $scope.search = '';

  });

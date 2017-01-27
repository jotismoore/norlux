'use strict';

/**
 * @ngdoc function
 * @name norluxAngularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the norluxAngularApp
 */
angular.module('norluxAngularApp')
  .controller('CarouselCtrl', function ($scope, $http) {
    $http.get("markdown/main_carousel_images.md").then(function(res) {
      var images = JSON.stringify(res.data).replace(/\\n/g, ",").replace(/"/g, '').split(',');
      $scope.mainCarouselImages = Object.values(images
        .map(function (i, val) {
          return ({'image': i})
        }));
      $scope.mainCarouselImages.pop();
    });
  })
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
  })
  .controller('StoreCtrl', function ($scope, Stores, $filter) {
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

    $scope.ordering = function(arr) {
      return $filter('min')
      ($filter('map')(arr, 'country'));
    };

  })
  .controller('CaseStudyCtrl', function ($scope, $http, $modal) {
    $http.get("markdown/case_study_images.md").then(function(res){
      var images = JSON.stringify(res.data).replace(/\\n/g, ",").replace(/"/g, '').split(',');
      $scope.caseStudiesImages = Object.values(images
        .map(function(i, val){
          return ({'image' : i})
        }));

      $scope.caseStudiesImages.pop();

      $scope.openCaseStudy=function($index){
        $scope.caseStudiesImages[$index].active=true;
        $scope.modalInstance=$modal.open({
          templateUrl: 'views/view-case-studies-modal.html',
          scope: $scope,
          windowClass: 'caseStudyModal',
          backdropClass: 'caseStudyBackdrop'
        });
      };

      $scope.closeCaseStudy=function(){
        for (var x in $scope.caseStudiesImages) {
          if ($scope.caseStudiesImages[x].hasOwnProperty('active')) {
            $scope.caseStudiesImages[x].active=false;
          }
        }
        $scope.modalInstance.close();
      };

    });

    $scope.caseStudiesFiles = function(imageName, thumb) {
      var folder = imageName.substring(0, imageName.lastIndexOf('_'));
      if (thumb) {
        return 'images/case_studies/' + folder + '/thumbnail_' + imageName + '.png';
      }
      else {
        return 'images/case_studies/' + folder + '/' + imageName + '.jpg';
      }
    };
  })
  .controller('MainCtrl', function ($scope) {
    $scope.search = '';

    new WOW().init();
  });

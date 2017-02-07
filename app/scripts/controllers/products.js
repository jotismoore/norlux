'use strict';

/**
 * @ngdoc function
 * @name norluxAngularApp.controller:ProductCtrl
 * @description
 * # ProductCtrl
 * Controller of the norluxAngularApp
 */
angular.module('norluxAngularApp')
  .controller('ProductCtrl', function ($scope, Products, $modal, $http) {
    $scope.$on('$locationChangeStart', function(ev) {
      ev.preventDefault();
    });
    Products.then(function(data){
      var cache = [];
      $scope.categories = [];
      $scope.categoryProducts = [];
      $scope.products = data;

      $scope.products.map(function (val) {
        if (val.hasOwnProperty('category')) {
          if (cache.indexOf(val.category) < 0) {
            cache.push(val.category);
            var cat = {
              'category': val.category,
              'products': []
            };
            $scope.categories.push(cat);
          }
        }
      });

      $scope.products.map(function (val) {
        for (var cat in $scope.categories) {
          if (val.category === $scope.categories[cat].category) {
            $scope.categories[cat].products.push(val);
          }
        }
      });

      $scope.openProduct=function(category, product){
        $scope.categoryProducts = category.products || category;
        for (var cat in $scope.categoryProducts) {
          if ($scope.categoryProducts[cat].id === product.id) {
            $scope.categoryProducts[cat].active = true;
          }
        }
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
              var slideLength = $(modal).find('.item').length - 1;
              clearInterval(getModal);
              $(modal).find('.loader').hide();
              $(modal).find('.carousel-inner').fadeIn();
              $(modal).find('.carousel-control').fadeIn();
              $(modal).find('.item').each(function(index, value) {
                if (index === 0 && $(value).hasClass('active')) {
                  $(modal).find('.left.carousel-control').hide();
                  return false;
                }
                if (index === slideLength && $(value).hasClass('active')) {
                  $(modal).find('.right.carousel-control').hide();
                  return false;
                }
              });
              $scope.onSlideChanged = function (nextSlide, direction, nextIndex) {
                if (nextIndex === 0) {
                  $(modal).find('.left.carousel-control').hide();
                  return false;
                }
                if (nextIndex === slideLength) {
                  $(modal).find('.right.carousel-control').hide();
                  return false;
                }
                else {
                  $(modal).find('.left.carousel-control').show();
                  $(modal).find('.right.carousel-control').show();
                }
              };
            }
          };
          modal = document.getElementsByClassName('productModal')[0];
          if (!modal) {
            var getModal = setInterval(getModalInterval, 2000);
          }
        });
      };

      $scope.closeProduct=function(){
        for (var cat in $scope.categoryProducts) {
          if ($scope.categoryProducts[cat].hasOwnProperty('active')) {
            $scope.categoryProducts[cat].active = false;
          }
        }
        $scope.modalInstance.close();
      };

      $scope.productEnquiry = function(product) {
        $http.get("markdown/product-enquiry-message.md").then(function(res) {
          var message = res.data.replace('{}', product.product).toString();
          $scope.modalInstance.close();
          $('#searchModal').modal('hide');
          $scope.closeProduct();
          $('#contact-form').find('input[name="name"]').focus();
          $('#contact-form').find('textarea[name="message"]').val(message);
        });
      };

    });

    $scope.productFilter = 'LED Spotlights';

    $scope.filterCategory = function(category) {
      if ($scope.productFilter != category) {
        $('.products-container .thumbnail').hide();
        $scope.productFilter = category;
      }
    };

  });

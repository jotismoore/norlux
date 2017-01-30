'use strict';

/**
 * @ngdoc function
 * @name norluxAngularApp.controller:CarouselCtrl
 * @description
 * # CarouselCtrl
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
  });

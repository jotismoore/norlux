'use strict';

/**
 * @ngdoc function
 * @name norluxAngularApp.controller:CaseStudyCtrl
 * @description
 * # CaseStudyCtrl
 * Controller of the norluxAngularApp
 */
angular.module('norluxAngularApp')
  .controller('CaseStudyCtrl', function ($scope, $http, $modal) {
    $scope.$on('$locationChangeStart', function(ev) {
      ev.preventDefault();
    });
    $http.get("markdown/case_study_images.md").then(function(res){
      var images = JSON.stringify(res.data).replace(/\\n/g, ",").replace(/"/g, '').split(',');
      $scope.caseStudiesImages = images.map(function (i, val) {
        return ({'image': i})
      });

      $scope.caseStudiesImages.pop();

      $scope.limit = 16;

      // loadMore function
      $scope.loadMore = function() {
        $scope.limit = $scope.limit + 16;
        if ($scope.limit >= $scope.caseStudiesImages.length) {
          $(".case_study_button").hide();
        }
      };

      // $scope.openCaseStudy=function($index){
      //   $scope.caseStudiesImages[$index].active=true;
      //   $scope.modalInstance=$modal.open({
      //     templateUrl: 'views/view-case-studies-modal.html',
      //     scope: $scope,
      //     windowClass: 'caseStudyModal',
      //     backdropClass: 'caseStudyBackdrop'
      //   });
      // };

      // $scope.closeCaseStudy=function(){
      //   for (var x in $scope.caseStudiesImages) {
      //     if ($scope.caseStudiesImages[x].hasOwnProperty('active')) {
      //       $scope.caseStudiesImages[x].active=false;
      //     }
      //   }
      //   $scope.modalInstance.close();
      // };

    });

    $scope.caseStudiesFiles = function(imageName, thumb) {
      // var folder = imageName.substring(0, imageName.lastIndexOf('_'));
      if (thumb) {
        return 'images/case_studies/' + imageName + '.png';
      }
      // else {
      //   return 'images/case_studies/' + folder + '/' + imageName + '.jpg';
      // }
    };
  });

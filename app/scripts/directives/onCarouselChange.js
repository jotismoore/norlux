'use strict';

angular.module('norluxAngularApp')
  .directive('onCarouselChange', function ($parse) {
    return {
      require: 'carousel',
      link: function (scope, element, attrs, carouselCtrl) {
        var fn = $parse(attrs.onCarouselChange);
        var origSelect = carouselCtrl.select;
        carouselCtrl.select = function (nextSlide, direction, nextIndex) {
          if (nextSlide !== this.currentSlide) {
            fn(scope, {
              nextSlide: nextSlide,
              direction: direction,
              nextIndex: carouselCtrl.slides.indexOf(nextSlide),
            });
          }
          return origSelect.apply(this, arguments);
        };
      }
    };
  });

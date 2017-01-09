'use strict';

angular.module('norluxAngularApp')
  .directive('scrollOnClick', function() {
  return {
    restrict: 'A',
    link: function(scope, $elm, attrs) {
      var idToScroll = attrs.href;
      $elm.on('click', function() {
        var $target;
        if (idToScroll) {
          $target = $(idToScroll);
        } else {
          $target = $elm;
        }
        $('#menuModal').modal('toggle');
        $("body, html").animate({scrollTop: $target.offset().top - 50}, "slow");
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
      });
    }
  };
});

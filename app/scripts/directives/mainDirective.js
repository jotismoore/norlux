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
        $("body, html").animate({scrollTop: $target.offset().top - 77}, 'slow');
        $('#menuModal').modal('toggle');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
      });
    }
  };
});

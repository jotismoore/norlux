'use strict';

var ViewProductModel = function () {
  this.visible = false;
};
ViewProductModel.prototype.open = function(product) {
  this.product = product;
  this.visible = true;
};
ViewProductModel.prototype.close = function() {
  this.visible = false;
};

angular.module('norluxAngularApp')
  .directive('viewProductModal', [function() {
  return {
    restrict: 'E',
    scope: {
      model: '=',
    },
    link: function(scope, element, attributes) {
      scope.$watch('model.visible', function(newValue) {
        var modalElement = element.find('.modal');
        modalElement.modal(newValue ? 'show' : 'hide');
      });

      element.on('shown.bs.modal', function() {
        scope.$apply(function() {
          scope.model.visible = true;
        });
      });

      element.on('hidden.bs.modal', function() {
        scope.$apply(function() {
          scope.model.visible = false;
        });
      });

    },
    templateUrl: 'views/view-product-modal.html'
  };
}]);

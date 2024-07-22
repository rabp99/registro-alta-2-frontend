'use strict';

describe('Controller: ProductosEntregarCtrl', function () {

  // load the controller's module
  beforeEach(module('registroAltaFrontendApp'));

  var ProductosEntregarCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProductosEntregarCtrl = $controller('ProductosEntregarCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ProductosEntregarCtrl.awesomeThings.length).toBe(3);
  });
});

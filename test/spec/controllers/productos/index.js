'use strict';

describe('Controller: ProductosIndexCtrl', function () {

  // load the controller's module
  beforeEach(module('registroAltaFrontendApp'));

  var ProductosIndexCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProductosIndexCtrl = $controller('ProductosIndexCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ProductosIndexCtrl.awesomeThings.length).toBe(3);
  });
});

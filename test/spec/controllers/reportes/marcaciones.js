'use strict';

describe('Controller: ReportesMarcacionesCtrl', function () {

  // load the controller's module
  beforeEach(module('registroAltaFrontendApp'));

  var ReportesMarcacionesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReportesMarcacionesCtrl = $controller('ReportesMarcacionesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ReportesMarcacionesCtrl.awesomeThings.length).toBe(3);
  });
});

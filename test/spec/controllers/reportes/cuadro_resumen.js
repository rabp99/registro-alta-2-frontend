'use strict';

describe('Controller: ReportesCuadroResumenCtrl', function () {

  // load the controller's module
  beforeEach(module('registroAltaFrontendApp'));

  var ReportesCuadroResumenCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReportesCuadroResumenCtrl = $controller('ReportesCuadroResumenCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ReportesCuadroResumenCtrl.awesomeThings.length).toBe(3);
  });
});

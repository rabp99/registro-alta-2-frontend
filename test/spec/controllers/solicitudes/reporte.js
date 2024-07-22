'use strict';

describe('Controller: SolicitudesReporteCtrl', function () {

  // load the controller's module
  beforeEach(module('registroAltaFrontendApp'));

  var SolicitudesReporteCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SolicitudesReporteCtrl = $controller('SolicitudesReporteCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SolicitudesReporteCtrl.awesomeThings.length).toBe(3);
  });
});

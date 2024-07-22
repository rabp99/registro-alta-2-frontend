'use strict';

describe('Controller: ProgramacionesEntradaCtrl', function () {

  // load the controller's module
  beforeEach(module('registroAltaFrontendApp'));

  var ProgramacionesEntradaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProgramacionesEntradaCtrl = $controller('ProgramacionesEntradaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ProgramacionesEntradaCtrl.awesomeThings.length).toBe(3);
  });
});

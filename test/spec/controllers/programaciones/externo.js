'use strict';

describe('Controller: ProgramacionesExternoCtrl', function () {

  // load the controller's module
  beforeEach(module('registroAltaFrontendApp'));

  var ProgramacionesExternoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProgramacionesExternoCtrl = $controller('ProgramacionesExternoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ProgramacionesExternoCtrl.awesomeThings.length).toBe(3);
  });
});

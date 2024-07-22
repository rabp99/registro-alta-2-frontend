'use strict';

describe('Controller: ProgramacionesRegisterCtrl', function () {

  // load the controller's module
  beforeEach(module('registroAltaFrontendApp'));

  var ProgramacionesRegisterCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProgramacionesRegisterCtrl = $controller('ProgramacionesRegisterCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ProgramacionesRegisterCtrl.awesomeThings.length).toBe(3);
  });
});

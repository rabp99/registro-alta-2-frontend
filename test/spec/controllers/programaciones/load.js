'use strict';

describe('Controller: ProgramacionesLoadCtrl', function () {

  // load the controller's module
  beforeEach(module('registroAltaFrontendApp'));

  var ProgramacionesLoadCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProgramacionesLoadCtrl = $controller('ProgramacionesLoadCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ProgramacionesLoadCtrl.awesomeThings.length).toBe(3);
  });
});

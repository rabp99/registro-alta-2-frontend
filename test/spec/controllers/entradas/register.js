'use strict';

describe('Controller: EntradasRegisterCtrl', function () {

  // load the controller's module
  beforeEach(module('registroAltaFrontendApp'));

  var EntradasRegisterCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EntradasRegisterCtrl = $controller('EntradasRegisterCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EntradasRegisterCtrl.awesomeThings.length).toBe(3);
  });
});

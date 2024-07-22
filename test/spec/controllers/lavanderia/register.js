'use strict';

describe('Controller: LavanderiaRegisterCtrl', function () {

  // load the controller's module
  beforeEach(module('registroAltaFrontendApp'));

  var LavanderiaRegisterCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LavanderiaRegisterCtrl = $controller('LavanderiaRegisterCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(LavanderiaRegisterCtrl.awesomeThings.length).toBe(3);
  });
});

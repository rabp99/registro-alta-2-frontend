'use strict';

describe('Controller: DevolucionesIndexCtrl', function () {

  // load the controller's module
  beforeEach(module('registroAltaFrontendApp'));

  var DevolucionesIndexCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DevolucionesIndexCtrl = $controller('DevolucionesIndexCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DevolucionesIndexCtrl.awesomeThings.length).toBe(3);
  });
});

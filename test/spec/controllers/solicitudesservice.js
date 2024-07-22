'use strict';

describe('Controller: SolicitudesserviceCtrl', function () {

  // load the controller's module
  beforeEach(module('registroAltaFrontendApp'));

  var SolicitudesserviceCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SolicitudesserviceCtrl = $controller('SolicitudesserviceCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SolicitudesserviceCtrl.awesomeThings.length).toBe(3);
  });
});

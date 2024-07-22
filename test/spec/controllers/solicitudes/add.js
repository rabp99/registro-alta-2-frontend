'use strict';

describe('Controller: SolicitudesAddCtrl', function () {

  // load the controller's module
  beforeEach(module('registroAltaFrontendApp'));

  var SolicitudesAddCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SolicitudesAddCtrl = $controller('SolicitudesAddCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SolicitudesAddCtrl.awesomeThings.length).toBe(3);
  });
});

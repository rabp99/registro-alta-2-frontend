'use strict';

describe('Controller: SolicitudesFirmaCtrl', function () {

  // load the controller's module
  beforeEach(module('registroAltaFrontendApp'));

  var SolicitudesFirmaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SolicitudesFirmaCtrl = $controller('SolicitudesFirmaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SolicitudesFirmaCtrl.awesomeThings.length).toBe(3);
  });
});

'use strict';

describe('Controller: SolicitudesDevolverCtrl', function () {

  // load the controller's module
  beforeEach(module('registroAltaFrontendApp'));

  var SolicitudesDevolverCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SolicitudesDevolverCtrl = $controller('SolicitudesDevolverCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SolicitudesDevolverCtrl.awesomeThings.length).toBe(3);
  });
});

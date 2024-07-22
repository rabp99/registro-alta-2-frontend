'use strict';

describe('Controller: AreasEditCtrl', function () {

  // load the controller's module
  beforeEach(module('registroAltaFrontendApp'));

  var AreasEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AreasEditCtrl = $controller('AreasEditCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AreasEditCtrl.awesomeThings.length).toBe(3);
  });
});

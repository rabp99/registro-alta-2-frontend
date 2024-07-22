'use strict';

describe('Controller: AreasAddCtrl', function () {

  // load the controller's module
  beforeEach(module('registroAltaFrontendApp'));

  var AreasAddCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AreasAddCtrl = $controller('AreasAddCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AreasAddCtrl.awesomeThings.length).toBe(3);
  });
});

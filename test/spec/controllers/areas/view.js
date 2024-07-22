'use strict';

describe('Controller: AreasViewCtrl', function () {

  // load the controller's module
  beforeEach(module('registroAltaFrontendApp'));

  var AreasViewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AreasViewCtrl = $controller('AreasViewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AreasViewCtrl.awesomeThings.length).toBe(3);
  });
});

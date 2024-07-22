'use strict';

describe('Controller: AreasIndexCtrl', function () {

  // load the controller's module
  beforeEach(module('registroAltaFrontendApp'));

  var AreasIndexCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AreasIndexCtrl = $controller('AreasIndexCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AreasIndexCtrl.awesomeThings.length).toBe(3);
  });
});

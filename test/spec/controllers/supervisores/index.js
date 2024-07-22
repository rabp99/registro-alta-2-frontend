'use strict';

describe('Controller: SupervisoresIndexCtrl', function () {

  // load the controller's module
  beforeEach(module('registroAltaFrontendApp'));

  var SupervisoresIndexCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SupervisoresIndexCtrl = $controller('SupervisoresIndexCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SupervisoresIndexCtrl.awesomeThings.length).toBe(3);
  });
});

'use strict';

describe('Controller: SupervisoresAddCtrl', function () {

  // load the controller's module
  beforeEach(module('registroAltaFrontendApp'));

  var SupervisoresAddCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SupervisoresAddCtrl = $controller('SupervisoresAddCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SupervisoresAddCtrl.awesomeThings.length).toBe(3);
  });
});

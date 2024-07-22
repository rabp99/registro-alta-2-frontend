'use strict';

describe('Controller: ColaboradoresAddCtrl', function () {

  // load the controller's module
  beforeEach(module('registroAltaFrontendApp'));

  var ColaboradoresAddCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ColaboradoresAddCtrl = $controller('ColaboradoresAddCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ColaboradoresAddCtrl.awesomeThings.length).toBe(3);
  });
});

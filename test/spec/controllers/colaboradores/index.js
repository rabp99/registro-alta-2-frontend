'use strict';

describe('Controller: ColaboradoresIndexCtrl', function () {

  // load the controller's module
  beforeEach(module('registroAltaFrontendApp'));

  var ColaboradoresIndexCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ColaboradoresIndexCtrl = $controller('ColaboradoresIndexCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ColaboradoresIndexCtrl.awesomeThings.length).toBe(3);
  });
});

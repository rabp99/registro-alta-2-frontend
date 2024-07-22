'use strict';

describe('Controller: IndumentariaLiberarCtrl', function () {

  // load the controller's module
  beforeEach(module('registroAltaFrontendApp'));

  var IndumentariaLiberarCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IndumentariaLiberarCtrl = $controller('IndumentariaLiberarCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(IndumentariaLiberarCtrl.awesomeThings.length).toBe(3);
  });
});

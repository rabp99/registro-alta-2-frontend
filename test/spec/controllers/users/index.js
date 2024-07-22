'use strict';

describe('Controller: UsersIndexCtrl', function () {

  // load the controller's module
  beforeEach(module('registroAltaFrontendApp'));

  var UsersIndexCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UsersIndexCtrl = $controller('UsersIndexCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(UsersIndexCtrl.awesomeThings.length).toBe(3);
  });
});

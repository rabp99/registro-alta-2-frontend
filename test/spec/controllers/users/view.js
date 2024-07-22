'use strict';

describe('Controller: UsersViewCtrl', function () {

  // load the controller's module
  beforeEach(module('registroAltaFrontendApp'));

  var UsersViewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UsersViewCtrl = $controller('UsersViewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(UsersViewCtrl.awesomeThings.length).toBe(3);
  });
});

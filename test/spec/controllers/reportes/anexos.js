'use strict';

describe('Controller: ReportesAnexosCtrl', function () {

  // load the controller's module
  beforeEach(module('registroAltaFrontendApp'));

  var ReportesAnexosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReportesAnexosCtrl = $controller('ReportesAnexosCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ReportesAnexosCtrl.awesomeThings.length).toBe(3);
  });
});

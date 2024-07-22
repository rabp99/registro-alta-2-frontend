'use strict';

describe('Controller: ReportesProductosCtrl', function () {

  // load the controller's module
  beforeEach(module('registroAltaFrontendApp'));

  var ReportesProductosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReportesProductosCtrl = $controller('ReportesProductosCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ReportesProductosCtrl.awesomeThings.length).toBe(3);
  });
});

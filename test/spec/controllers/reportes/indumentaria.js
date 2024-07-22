'use strict';

describe('Controller: ReportesIndumentariaCtrl', function () {

  // load the controller's module
  beforeEach(module('registroAltaFrontendApp'));

  var ReportesIndumentariaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReportesIndumentariaCtrl = $controller('ReportesIndumentariaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ReportesIndumentariaCtrl.awesomeThings.length).toBe(3);
  });
});

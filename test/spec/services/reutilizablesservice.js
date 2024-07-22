'use strict';

describe('Service: reutilizablesService', function () {

  // load the service's module
  beforeEach(module('registroAltaFrontendApp'));

  // instantiate service
  var reutilizablesService;
  beforeEach(inject(function (_reutilizablesService_) {
    reutilizablesService = _reutilizablesService_;
  }));

  it('should do something', function () {
    expect(!!reutilizablesService).toBe(true);
  });

});

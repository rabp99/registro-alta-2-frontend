'use strict';

describe('Service: consumiblesService', function () {

  // load the service's module
  beforeEach(module('registroAltaFrontendApp'));

  // instantiate service
  var consumiblesService;
  beforeEach(inject(function (_consumiblesService_) {
    consumiblesService = _consumiblesService_;
  }));

  it('should do something', function () {
    expect(!!consumiblesService).toBe(true);
  });

});

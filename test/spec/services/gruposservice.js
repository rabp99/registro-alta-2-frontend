'use strict';

describe('Service: gruposService', function () {

  // load the service's module
  beforeEach(module('registroAltaFrontendApp'));

  // instantiate service
  var gruposService;
  beforeEach(inject(function (_gruposService_) {
    gruposService = _gruposService_;
  }));

  it('should do something', function () {
    expect(!!gruposService).toBe(true);
  });

});

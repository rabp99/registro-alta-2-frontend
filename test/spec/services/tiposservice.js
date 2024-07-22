'use strict';

describe('Service: tiposService', function () {

  // load the service's module
  beforeEach(module('registroAltaFrontendApp'));

  // instantiate service
  var tiposService;
  beforeEach(inject(function (_tiposService_) {
    tiposService = _tiposService_;
  }));

  it('should do something', function () {
    expect(!!tiposService).toBe(true);
  });

});

'use strict';

describe('Service: entradasService', function () {

  // load the service's module
  beforeEach(module('registroAltaFrontendApp'));

  // instantiate service
  var entradasService;
  beforeEach(inject(function (_entradasService_) {
    entradasService = _entradasService_;
  }));

  it('should do something', function () {
    expect(!!entradasService).toBe(true);
  });

});

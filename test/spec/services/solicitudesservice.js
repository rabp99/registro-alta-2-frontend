'use strict';

describe('Service: solicitudesService', function () {

  // load the service's module
  beforeEach(module('registroAltaFrontendApp'));

  // instantiate service
  var solicitudesService;
  beforeEach(inject(function (_solicitudesService_) {
    solicitudesService = _solicitudesService_;
  }));

  it('should do something', function () {
    expect(!!solicitudesService).toBe(true);
  });

});

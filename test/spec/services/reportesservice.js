'use strict';

describe('Service: reportesService', function () {

  // load the service's module
  beforeEach(module('registroAltaFrontendApp'));

  // instantiate service
  var reportesService;
  beforeEach(inject(function (_reportesService_) {
    reportesService = _reportesService_;
  }));

  it('should do something', function () {
    expect(!!reportesService).toBe(true);
  });

});

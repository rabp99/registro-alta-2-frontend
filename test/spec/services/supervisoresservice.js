'use strict';

describe('Service: supervisoresService', function () {

  // load the service's module
  beforeEach(module('registroAltaFrontendApp'));

  // instantiate service
  var supervisoresService;
  beforeEach(inject(function (_supervisoresService_) {
    supervisoresService = _supervisoresService_;
  }));

  it('should do something', function () {
    expect(!!supervisoresService).toBe(true);
  });

});

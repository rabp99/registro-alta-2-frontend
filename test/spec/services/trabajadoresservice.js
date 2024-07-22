'use strict';

describe('Service: trabajadoresService', function () {

  // load the service's module
  beforeEach(module('registroAltaFrontendApp'));

  // instantiate service
  var trabajadoresService;
  beforeEach(inject(function (_trabajadoresService_) {
    trabajadoresService = _trabajadoresService_;
  }));

  it('should do something', function () {
    expect(!!trabajadoresService).toBe(true);
  });

});

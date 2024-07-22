'use strict';

describe('Service: entregadosService', function () {

  // load the service's module
  beforeEach(module('registroAltaFrontendApp'));

  // instantiate service
  var entregadosService;
  beforeEach(inject(function (_entregadosService_) {
    entregadosService = _entregadosService_;
  }));

  it('should do something', function () {
    expect(!!entregadosService).toBe(true);
  });

});

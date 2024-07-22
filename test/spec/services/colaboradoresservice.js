'use strict';

describe('Service: colaboradoresService', function () {

  // load the service's module
  beforeEach(module('registroAltaFrontendApp'));

  // instantiate service
  var colaboradoresService;
  beforeEach(inject(function (_colaboradoresService_) {
    colaboradoresService = _colaboradoresService_;
  }));

  it('should do something', function () {
    expect(!!colaboradoresService).toBe(true);
  });

});

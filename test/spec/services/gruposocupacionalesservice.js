'use strict';

describe('Service: gruposOcupacionalesService', function () {

  // load the service's module
  beforeEach(module('registroAltaFrontendApp'));

  // instantiate service
  var gruposOcupacionalesService;
  beforeEach(inject(function (_gruposOcupacionalesService_) {
    gruposOcupacionalesService = _gruposOcupacionalesService_;
  }));

  it('should do something', function () {
    expect(!!gruposOcupacionalesService).toBe(true);
  });

});

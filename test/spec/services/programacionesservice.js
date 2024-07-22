'use strict';

describe('Service: programacionesService', function () {

  // load the service's module
  beforeEach(module('registroAltaFrontendApp'));

  // instantiate service
  var programacionesService;
  beforeEach(inject(function (_programacionesService_) {
    programacionesService = _programacionesService_;
  }));

  it('should do something', function () {
    expect(!!programacionesService).toBe(true);
  });

});

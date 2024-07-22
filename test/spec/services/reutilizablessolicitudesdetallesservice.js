'use strict';

describe('Service: reutilizablesSolicitudesDetallesService', function () {

  // load the service's module
  beforeEach(module('registroAltaFrontendApp'));

  // instantiate service
  var reutilizablesSolicitudesDetallesService;
  beforeEach(inject(function (_reutilizablesSolicitudesDetallesService_) {
    reutilizablesSolicitudesDetallesService = _reutilizablesSolicitudesDetallesService_;
  }));

  it('should do something', function () {
    expect(!!reutilizablesSolicitudesDetallesService).toBe(true);
  });

});

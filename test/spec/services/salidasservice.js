'use strict';

describe('Service: salidasService', function () {

  // load the service's module
  beforeEach(module('registroAltaFrontendApp'));

  // instantiate service
  var salidasService;
  beforeEach(inject(function (_salidasService_) {
    salidasService = _salidasService_;
  }));

  it('should do something', function () {
    expect(!!salidasService).toBe(true);
  });

});

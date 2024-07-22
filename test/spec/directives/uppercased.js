'use strict';

describe('Directive: uppercased', function () {

  // load the directive's module
  beforeEach(module('registroAltaFrontendApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<uppercased></uppercased>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the uppercased directive');
  }));
});

'use strict';

/**
 * @ngdoc service
 * @name registroAltaFrontendApp.entradasService
 * @description
 * # entradasService
 * Factory in the registroAltaFrontendApp.
 */
angular.module('registroAltaFrontendApp')
.factory('entradasService', function ($resource, envService) {
    return $resource(envService.getHost() + 'entradas/:id.json', {id: '@id'}, {});
});
'use strict';

/**
 * @ngdoc service
 * @name registroAltaFrontendApp.registrosService
 * @description
 * # registrosService
 * Factory in the registroAltaFrontendApp.
 */
angular.module('registroAltaFrontendApp')
.factory('registrosService', function ($resource, envService) {
    return $resource(envService.getHost() + 'registros/:id.json', {id: '@id'});
});
'use strict';

/**
 * @ngdoc service
 * @name registroAltaFrontendApp.gruposService
 * @description
 * # gruposService
 * Factory in the registroAltaFrontendApp.
 */
angular.module('registroAltaFrontendApp')
.factory('gruposService', function ($resource, envService) {
    return $resource(envService.getHost() + 'grupos/:id.json', {}, {
        getCuestionario: {
            method: 'GET',
            url: envService.getHost() + 'grupos/get_cuestionario.json'
        }
    });
});
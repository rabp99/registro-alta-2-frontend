'use strict';

/**
 * @ngdoc service
 * @name registroAltaFrontendApp.supervisoresService
 * @description
 * # supervisoresService
 * Factory in the registroAltaFrontendApp.
 */
angular.module('registroAltaFrontendApp')
.factory('supervisoresService', function ($resource, envService) {
    return $resource(envService.getHost() + 'supervisores/:id.json', {}, {
        findByDni: {
            method: 'GET',
            url: envService.getHost() + 'supervisores/find_by_dni.json'
        },
        getEnabled: {
            method: 'GET',
            url: envService.getHost() + 'supervisores/get_enabled.json'
        }
    });
});
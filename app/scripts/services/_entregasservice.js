'use strict';

/**
 * @ngdoc service
 * @name registroAltaFrontendApp.entregadosService
 * @description
 * # entregadosService
 * Factory in the registroAltaFrontendApp.
 */
angular.module('registroAltaFrontendApp')
.factory('entregasService', function ($resource, envService) {
    return $resource(envService.getHost() + 'entregas/:id.json', {}, {
        findEntregas: {
            method: 'GET',
            url: envService.getHost() + 'entregas/find_entregas/:dni.json'            
        }
    });
});
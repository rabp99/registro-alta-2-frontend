'use strict';

/**
 * @ngdoc service
 * @name registroAltaFrontendApp.tiposService
 * @description
 * # tiposService
 * Factory in the registroAltaFrontendApp.
 */
angular.module('registroAltaFrontendApp')
.factory('tiposService', function ($resource, envService) {
    return $resource(envService.getHost() + 'tipos/:id.json', {}, {
        getEnabled: {
            method: 'GET',
            url: envService.getHost() + 'tipos/get_enabled.json'            
        }
    });
});
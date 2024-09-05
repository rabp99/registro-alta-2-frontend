'use strict';

/**
 * @ngdoc service
 * @name registroAltaFrontendApp.parametersService
 * @description
 * # parametersService
 * Factory in the registroAltaFrontendApp.
 */
angular.module('registroAltaFrontendApp')
    .factory('parametersService', function ($resource, envService) {
        var endpointUrl = 'parameters';
        return $resource(envService.getHost() + endpointUrl + '/:id.json', {}, {
            getByKey: {
                method: 'GET',
                url: envService.getHost() + endpointUrl + '/get-by-key/:key.json'
            },
            getByKeys: {
                method: 'GET',
                url: envService.getHost() + endpointUrl + '/get-by-keys/:keys.json'
            },
            saveConfiguration: {
                method: 'POST',
                url: envService.getHost() + endpointUrl + '/save-configuration.json'
            }
        });
    });
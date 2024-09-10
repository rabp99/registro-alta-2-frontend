'use strict';

/**
 * @ngdoc service
 * @name registroAltaFrontendApp.workersService
 * @description
 * # workersService
 * Factory in the registroAltaFrontendApp.
 */
angular.module('registroAltaFrontendApp')
    .factory('workersService', function ($resource, envService) {
        var endpointUrl = 'workers';
        return $resource(envService.getHost() + endpointUrl + '/:id.json', {}, {
            findByDocument: {
                method: 'GET',
                url: envService.getHost() + endpointUrl + '/find-by-document/:document_type/:document_number.json'
            },
            update: {
                method: 'PUT',
                url: envService.getHost() + endpointUrl + '/update/:document_type/:document_number.json'
            }
        });
    });
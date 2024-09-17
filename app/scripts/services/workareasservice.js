'use strict';

/**
 * @ngdoc service
 * @name registroAltaFrontendApp.workerAreasService
 * @description
 * # workerAreasService
 * Factory in the registroAltaFrontendApp.
 */
angular.module('registroAltaFrontendApp')
    .factory('workAreasService', function ($resource, envService) {
        var endpointUrl = 'work-areas';
        return $resource(envService.getHost() + endpointUrl + '/:id.json', {}, {
            getListByWorkplaceAndWorker: {
                method: 'GET',
                url: envService.getHost() + endpointUrl + '/get-list-by-workplace-and-worker/:workplace_id/:worker_document_type/:worker_document_number.json'
            },
        });
    });
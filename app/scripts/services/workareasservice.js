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
            getListByWorkplaceAndWorkerType: {
                method: 'GET',
                url: envService.getHost() + endpointUrl + '/get-list-by-workplace-and-worker-type/:workplace_id/:worker_type.json'
            },
        });
    });
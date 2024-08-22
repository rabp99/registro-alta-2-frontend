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
        let url = 'work-areas';
        return $resource(envService.getHost() + url + '/:id.json', {}, {
            getListByWorkplaceAndWorkerType: {
                method: 'GET',
                url: envService.getHost() + url + '/get-list-by-workplace-and-worker-type/:workplace_id/:worker_type.json'
            },
        });
    });
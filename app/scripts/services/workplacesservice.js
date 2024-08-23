'use strict';

/**
 * @ngdoc service
 * @name registroAltaFrontendApp.workerplacesService
 * @description
 * # workerplacesService
 * Factory in the registroAltaFrontendApp.
 */
angular.module('registroAltaFrontendApp')
    .factory('workplacesService', function ($resource, envService) {
        var endpointUrl = 'workplaces';
        return $resource(envService.getHost() + endpointUrl + '/:id.json', {}, {
            getListByWorkerType: {
                method: 'GET',
                url: envService.getHost() + endpointUrl + '/get-list-by-worker-type/:worker_type.json'
            },
        });
    });
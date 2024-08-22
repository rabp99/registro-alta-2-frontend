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
        let url = 'workplaces';
        return $resource(envService.getHost() + url + '/:id.json', {}, {
            getListByWorkerType: {
                method: 'GET',
                url: envService.getHost() + url + '/get-list-by-worker-type/:worker_type.json'
            },
        });
    });
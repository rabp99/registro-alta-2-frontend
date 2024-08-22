'use strict';

/**
 * @ngdoc service
 * @name registroAltaFrontendApp.workerConditionsService
 * @description
 * # workerConditionsService
 * Factory in the registroAltaFrontendApp.
 */
angular.module('registroAltaFrontendApp')
    .factory('workerConditionsService', function ($resource, envService) {
        let url = 'worker-conditions';
        return $resource(envService.getHost() + url + '/:id.json', {}, {
            getList: {
                method: 'GET',
                url: envService.getHost() + url + '/get-list.json'
            },
        });
    });
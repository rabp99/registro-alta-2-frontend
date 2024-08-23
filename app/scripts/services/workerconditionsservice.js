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
        var endpointUrl = 'worker-conditions';
        return $resource(envService.getHost() + endpointUrl + '/:id.json', {}, {
            getList: {
                method: 'GET',
                url: envService.getHost() + endpointUrl + '/get-list.json'
            },
        });
    });
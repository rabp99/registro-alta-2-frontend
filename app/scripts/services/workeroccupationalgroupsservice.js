'use strict';

/**
 * @ngdoc service
 * @name registroAltaFrontendApp.workerOccupationalGroupsService
 * @description
 * # workerOccupationalGroupsService
 * Factory in the registroAltaFrontendApp.
 */
angular.module('registroAltaFrontendApp')
    .factory('workerOccupationalGroupsService', function ($resource, envService) {
        var endpointUrl = 'worker-occupational-groups';
        return $resource(envService.getHost() + endpointUrl + '/:id.json', {}, {
            getList: {
                method: 'GET',
                url: envService.getHost() + endpointUrl + '/get-list.json'
            },
        });
    });
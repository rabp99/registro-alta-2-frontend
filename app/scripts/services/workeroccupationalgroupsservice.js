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
        let url = 'worker-occupational-groups';
        return $resource(envService.getHost() + url + '/:id.json', {}, {
            getList: {
                method: 'GET',
                url: envService.getHost() + url + '/get-list.json'
            },
        });
    });
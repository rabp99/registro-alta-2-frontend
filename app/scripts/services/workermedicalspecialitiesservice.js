'use strict';

/**
 * @ngdoc service
 * @name registroAltaFrontendApp.workerMedicalSpecialitiesService
 * @description
 * # workerMedicalSpecialitiesService
 * Factory in the registroAltaFrontendApp.
 */
angular.module('registroAltaFrontendApp')
    .factory('workerMedicalSpecialitiesService', function ($resource, envService) {
        var endpointUrl = 'worker-medical-specialities';
        return $resource(envService.getHost() + endpointUrl + '/:id.json', {}, {
            getList: {
                method: 'GET',
                url: envService.getHost() + endpointUrl + '/get-list.json'
            },
        });
    });